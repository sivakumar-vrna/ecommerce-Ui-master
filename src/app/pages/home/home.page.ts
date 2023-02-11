import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { environment } from 'src/environments/environment';
import { isPlatform } from '@ionic/core';
import { BookDetailsService } from '../book-details/book-details.service';
import { ActivatedRoute, Router } from '@angular/router';



SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  encapsulation: ViewEncapsulation.None,

})
export class HomePage implements OnInit {
  trendings: Book[];
  latest: Book[];
  featured: Book[];
  bookid:any;
  domainUrl: string;



  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 30,
    preloadImages: true,
    // loop: true,
    navigation: true,
    // pagination: { clickable: true },
    scrollbar: false,
    autoplay:true
  };
  @ViewChild('bookSwiper', { static: false }) swiper?: SwiperComponent;

  constructor(
    private orchService: OrchestrationService,
    public toast: ToastWidget,
    private errorService: ErrorService,
    private bookDetailsService:BookDetailsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.onGetLatest();
    this.onGetTrending();
    this.onGetfeatured();
  
  
    if (isPlatform('capacitor')) {
      this.domainUrl = environment.capaciorUrl;
    } else {
      this.domainUrl = window.location.origin;
    }
    this.triggerHomeData();
    this.route.queryParams.subscribe((params) => {
      const bookId = params['id'];
      if (bookId) {
        this.bookDetailsService.bookDetailsModal(bookId);
      }
    });
  }
  triggerHomeData() {
    // this.homeService.getBannerData();
    // this.homeService.getContinueWatchData();
    // this.homeService.getFavouriteData();
    // this.homeService.getRentedData();
    // this.homeService.getHomeData();
  }


  async onGetLatest() {
    (await this.orchService.getLatest()).subscribe({
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



//   ngAfterContentChecked(): void {
//     if(this.swiper)
//     {
//       this.swiper.updateSwiper({})
//       this.swiper.swiperRef.autoplay.start();
//     }

// }

async onGetTrending() {
  (await this.orchService.getTrending()).subscribe({
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


  async onGetfeatured() {
    (await this.orchService.getfeatured()).subscribe({
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
