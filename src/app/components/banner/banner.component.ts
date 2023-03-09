import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';


// #importing Swiper core and required modules
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {  Virtual, Navigation, Pagination, A11y,Autoplay } from 'swiper';

// #installing Swiper modules
SwiperCore.use([Virtual, Navigation, Pagination, A11y,Autoplay]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    OrchestrationService,
  ]
})
export class BannerComponent implements OnInit {
  @Input() bannerData: any[];
  showBanner = false;
  dataSource: any[] = [];
  messageid:any[] = [] ;
  loading = false;
  country:['IN'];
  placeholder = 'assets/images/placeholder-banner.webp';
 

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    preloadImages: true,
    // loop: true,
    // navigation: true,
    // pagination: { clickable: true },
    scrollbar:false,
    autoplay:true,
  };
  
  @ViewChild('bannerSwiper', { static: false }) swiper?: SwiperComponent;
  constructor(
    private orchService: OrchestrationService,
    public toast: ToastWidget,
    private errorService: ErrorService) { }
  ngOnInit() {
    this.onGetBanners();
  }

  async onGetBanners() {
    (await this.orchService.getBanner()).subscribe({
      next: (res: any) => {
        
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.bannerData = res.data;
          console.log(this.bannerData)
        } else {
          this.errorService.onError(res);
        }
      },
      error: error => {
        this.errorService.onError(error);
      }
    });
  }
  
  ngAfterContentChecked(): void {
    if(this.swiper)
    {
      this.swiper.updateSwiper({})
      this.swiper.swiperRef.autoplay.start();
    }

}
}
