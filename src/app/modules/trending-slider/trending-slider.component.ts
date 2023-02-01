import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CardData } from 'src/app/shared/models/card.model';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { Book } from 'src/app/shared/models/book.model';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-trending-slider',
  templateUrl: './trending-slider.component.html',
  styleUrls: ['./trending-slider.component.scss'],
})
export class TrendingSliderComponent implements OnInit {
  trendings: Book[];
  showBanner = false;
  placeholder = 'assets/images/placeholder-banner.webp';

  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 15,
    preloadImages: true,
    loop: true,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: false,
  };
  @ViewChild('bannerSwiper', { static: false }) swiper?: SwiperComponent;
  constructor(
    private orchService: OrchestrationService,
    public toast: ToastWidget,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.onGetTrending();
  }

  onGetTrending() {
    this.orchService.getTrending().subscribe({
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
}
