import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import  SwiperCore, { Autoplay,Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
 import { ErrorService } from 'src/app/shared/services/error.service';
SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  isLoading = true;
  orders: any;
  trendings: Book[];
  history:Book[];
  latest: Book[];


  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 15,
    preloadImages: true,
    scrollbar: false,
    autoplay:true
  };
  constructor(
    private OrchService:OrchestrationService,
    private errorService:ErrorService
  ) { }

  ngOnInit() {
    this.onGetTrending();
    this. onGetLatest();
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


}
