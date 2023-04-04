import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { UserService } from 'src/app/shared/services/user.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { UiRentDataService } from 'src/app/shared/services/ui-orchestration/ui-rent-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';




@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  cardData:any = [{
    cardNo: '1212',
  }]

  @Input() contentData: any;

  isLoading: boolean = false;
  selectedCard: any;
  isPromoCode = false;
  isPromoCodeValid = false;
  promoTxt = 'VRNAMVP2021';
  currency: string = '';
  homeService: any;

  @Input() cardDetail: any;
  @Output() cardDeleted = new EventEmitter();



  emailId: string;
  stripeCustId: string;
  newCardForm: FormGroup;
  isSubmitted = false;
  dateobj = new Date();
  selectYears: any[] = [];
  maxExpiryYear = 20;
  Dialog:any


  constructor(
    private orchService: OrchestrationService,
    private errorService: ErrorService,
    private loadingController: LoadingController,
    private paymentService:PaymentService,
    private toast: ToastWidget,
    private userService:UserService,
    private uiRentDataService: UiRentDataService,
    private modalController :ModalController 
    ) { }

    ngOnInit() {
      this.onGetSavedCards();
      this.onDelete();
    }

    onCardSelection(e) {
      console.log(e.detail.value)
      this.selectedCard = e.detail.value;
    }

    
  async onGetSavedCards(){
    this.isLoading = true;
    const loading = await this.loadingController.create();
    (await this. orchService.getSavedCards()).subscribe((res: any) => {
      console.log(res);
      const data = res.data;
      if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
        this.cardData = data;
        console.log(this.cardData);
        this.selectedCard = this.cardData[1];
      } else {
        this.selectedCard = 'new';
      }
      this.isLoading = false;
      loading.dismiss();
    }, 
    (err) => {
      this.isLoading = false;
      loading.dismiss();
    }
    );
  }


  async onDelete() {
    
    
    const deleteCardData = {
      "stripeCustId": this.cardDetail.stripeCustId,
      "stripeCardId": this.cardDetail.stripeCardId,
    }
    {
      (await this.paymentService.deleteCard(deleteCardData)).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
            this.cardDeleted.emit();
            this.toast.onSuccess(res.message);
          } else {
            this.toast.onFail('Failed to delete card');
          }
        }, (err: any) => {
          this.toast.onFail('network error in delete card');
        }
      )
    }
  };
}

