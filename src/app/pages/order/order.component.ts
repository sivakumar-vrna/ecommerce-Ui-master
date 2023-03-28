import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import  SwiperCore, { Autoplay,Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ModalController } from '@ionic/angular';

SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  isLoading = true;
  order: any;
  trendings: Book[];
  history:Book[];
  latest: Book[];
  OrderDtls:any;
  // orders: any;
  orders: any[] = [];





  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 15,
    preloadImages: true,
    scrollbar: false,
    autoplay:true
  };
2
  constructor(
    private OrchService:OrchestrationService,
    private errorService:ErrorService,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    this.onGetTrending();
    this.onGetLatest();
    this.GetOrderDetails();
  }
  
  async GetOrderDetails()  {
    (await this.OrchService.getOrderDetails()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.orders = res.data;
          console.log(this.orders)
          
        } else {
          this.errorService.onError(res);
        }
      },
      error: error => {
        this.errorService.onError(error);
      }
    });
  }



  async onGetTrending() {
    (await this.OrchService.getTrending()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.trendings = res.data;
          console.log(this.trendings)
        } else {
          this.errorService.onError(res);
        }
      },
      error: error => {
        this.errorService.onError(error);
      }
    });
  }


  
  async onGetLatest() {
    (await this.OrchService.getLatest()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.latest = res.data;
          console.log(this.latest)
        } else {
          this.errorService.onError(res);
        }
      },
      error: error => {
        this.errorService.onError(error);
      }
    });
  }



  async viewOrderDetails(order) {
    const modal = await this.modalController.create({
      component: OrderComponent,
      componentProps: { order },
    });
    await modal.present();
  }
  
}
