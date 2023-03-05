import { Component, OnInit } from '@angular/core';
import  SwiperCore, { Autoplay,Navigation, Pagination, Scrollbar, A11y, SwiperOptions } from 'swiper';
import { Book } from 'src/app/shared/models/book.model';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ErrorService } from 'src/app/shared/services/error.service';
SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);



@Component({
  selector: 'app-buy-again',
  templateUrl: './buy-again.component.html',
  styleUrls: ['./buy-again.component.scss'],
})
export class BuyAgainComponent implements OnInit {
  trendings: Book[];
  isLoading = true;
  orders: any;
  history:Book[];
  latest: Book[];
  featured: Book[];



  
  config: SwiperOptions = {
    slidesPerView: 6,
    spaceBetween: 5,
    preloadImages: true,
    scrollbar: false,
    autoplay:true,
  };
  constructor(
    private OrchService:OrchestrationService,
    private errorService:ErrorService
  ) { }

  ngOnInit() {
    this.onGetTrending();
    this.onGetLatest();
    this.onGetfeatured()
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



  
  async onGetfeatured() {
    (await this.OrchService.getfeatured()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.featured = res.data;
          console.log(this.featured)
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
