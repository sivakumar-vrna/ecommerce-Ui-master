import { Component, OnInit,Input } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { UserService } from 'src/app/shared/services/user.service';
import { UiRentDataService } from 'src/app/shared/services/ui-orchestration/ui-rent-data.service';
import { ActivatedRoute } from '@angular/router';
import { CartPage } from '../cart/cart.page';
import { CartPageModule } from '../cart/cart.module';
import { COUNTRY_KEY } from 'src/app/shared/services/ui-orchestration/orch.service';
import { COUNTRIES_KEY } from 'src/app/shared/services/ui-orchestration/orch.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @Input() contentData: any;
  book: Book;
  isLoading: boolean = false;
  public cardData: any;
  public addressData:any;
  emailId: string;
  stripeCustId: string;
  selectedCard: any;
  selectedAddress: any;
  subtotal: number = 0;

  cartitems: any[] = [];

  contentPrice: number;
  isPromoCode = false;
  isPromoCodeValid = false;
  promoTxt = 'VRNAMVP2021';
  currency: string = '';
  homeService: any;



  constructor(
    private orchService: OrchestrationService,
    private errorService: ErrorService,
    private loadingController: LoadingController,
    private paymentService:PaymentService,
    private utilService: ToastWidget,
    private userService:UserService,
    private uiRentDataService: UiRentDataService,
    private modalController :ModalController,
    private route: ActivatedRoute,
    private cartPageModule :CartPageModule 
    

    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      
      this.cartitems = JSON.parse(params['cartItems']);
      console.log(params);
      // const cost = this.cartitems ['cost'];
      
      const cost = params['cartItems'].cost;

      console.log("check hear")
      console.log(this.cartitems);
      console.log(cost);
      // this.cartPageModule.getAllCartItems()
    });
  




    this.onGetSavedCards();
    this.ongetSavedAddress();
    // this.onGetRental();
    this.userService.getEmail().then(res => this.emailId = res);
    this.userService.getStripeId().then(res => this.stripeCustId = res);
    
  }

 
  

  onCardSelection(e) {
    console.log(e.detail.value)
    this.selectedCard = e.detail.value;
  }

  onAddressSelection(e) {
    console.log(e.detail.value)
    this.selectedAddress = e.detail.value;
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
    }, (err) => {
      this.isLoading = false;
      loading.dismiss();
    }
    );
  }
  
  async ongetSavedAddress(){
    this.isLoading = true;
    const loading = await this.loadingController.create();
    (await this.orchService.getSavedAddress()).subscribe((res: any) => {
      console.log(res);
      const data = res.data;
      if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
        // Only display the first 10 addresses in the array
        this.addressData = data.slice(0, 5);
        console.log(this.addressData);
        this.selectedAddress = this.addressData[1];
      } else {
        this.selectedAddress = 'new';
      }
      this.isLoading = false;
      loading.dismiss();
    }, (err) => {
      console.log('siva:', err);
      this.isLoading = false;
      loading.dismiss();
    });
}


  
  async onGetRental() {
    this.isLoading = true;
    const userId = await this.userService.getUserId();
    console.log('userId:', userId);
    const userName = await this.userService.getEmail();
    console.log('userName:', userName);
    console.log('contentData:', this.contentData);
    
      const rentalData = {
        custId: userId,
        emailId: userName,
         stripeCardId: this.isPromoCodeValid ? null : this.selectedCard.stripeCardId,
         stripeCustId: this.isPromoCodeValid ? null : this.selectedCard.stripeCustId,
         stripetokenId:this.isPromoCodeValid ? null : this.selectedCard.stripetokenId,
         currency:"INR",
      };
      console.log('rentalData:', rentalData);
  
      (await this.orchService.onPayment(rentalData)).subscribe(
        (res: any) => {
          console.log(res);
          const data = res.data;
          if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
            this.cardData = data;
          } else {
            this.errorService.onError(res);
          }
          this.isLoading = false;
        },
        (err) => {
          this.errorService.onError(err);
          this.isLoading = false;
        }
      );
      
    // else {
    //   console.error('contentData is undefined or does not have cartId property.');
    // }
  };
  
  // async onGetRental() {
  //   this.isLoading = true;
  //   const userId = await this.userService.getUserId();
  //   const userName = await this.userService.getEmail();
  //   const rentalData = {
  //     custId: userId,
  //     // bookId: this.contentData.bookId,
  //     amount: this.contentPrice,
  //     currency: 'INR',
  //     description: `This transaction is for renting the movie: ${this.contentData.moviename} for INR ${this.contentPrice} by ${userName}`,
  //     promoCode: this.contentPrice === 0 ? this.promoTxt : 'false',
  //     stripeCardId: this.isPromoCodeValid ? null : this.selectedCard.stripeCardId,
  //     stripeCustId: this.isPromoCodeValid ? null : this.selectedCard.stripeCustId
  //   };
  //   (await this.paymentService.onPayment(rentalData)).subscribe(
  //     (res: any) => {
  //       console.log(res);
  //       const data = res.data;
  //       if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
  //         const msgBody: string = `You have purchased ${this.contentData.moviename} for INR ${this.contentData.ppmCost}.`
  //         this.utilService.onSuccess(msgBody);
  //         this.uiRentDataService.userRentedMovies();
  //         this.homeService.getAllHomeData();
  //         this.localNotification(this.contentData.moviename, msgBody);
  //         this.dismiss(true);
  //       } else {
  //         this.errorService.onError(res);
  //       }
  //       this.isLoading = false;
  //     },
  //     (err) => {
  //       this.errorService.onError(err);
  //       this.isLoading = false;
  //     }
  //   );
  // }




  async dismiss(status: boolean) {
    await this.modalController.dismiss(status);
    console.log('Rent is Closed')
  }

  // Local Notification
  async localNotification(title: string, body: string) {
    await Notification.requestPermission();
    await Notification[""]({
      notifications: [
        {
          title: title,
          body: body,
          id: 1,
        }
      ]
    })
  }



}
