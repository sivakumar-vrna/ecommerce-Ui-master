import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { isPlatform, ModalController } from '@ionic/angular';
import { BackgroundColorOptions } from '@capacitor/status-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper';
import { OrchService } from 'src/app/shared/services/ui-orchestration/orch.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { Book } from 'src/app/shared/models/book.model';
import  SwiperCore, { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Share } from '@capacitor/share';
import { ErrorService } from 'src/app/shared/services/error.service';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';




SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})

export class BookDetailsPage implements OnInit, AfterViewInit, OnDestroy {
  @Input() bookId: number;
  @Input() data:Book;
  // @Input() bannerData: any[];
  cart = [];
  products = [];
  // cartItemCount: BehaviorSubject<number>;
  movieId: number;
  routeSub: Subscription;
  book: Book;
  showBanner = false;
  banner:any;
  casts: any;
  isLoading = true;
  suggestions = [];
  trendings: Book[];
  placeholder = 'assets/images/placeholder-banner.webp';
  
  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 15,
    preloadImages: true,
    scrollbar: false,
    autoplay:true
  };

  domainUrl: string;
  opts: BackgroundColorOptions = {
    color: '#000000'
  }

  suggestionOptions: SwiperOptions = {
    centeredSlides: false,
    loop: false,
    breakpoints: {
      0: {
        slidesPerView: 2.1,
        spaceBetween: 10,
      },
      576: {
        slidesPerView: 2.2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 2.1,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3.1,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 3.1,
        spaceBetween: 15,
      },
    },
  };


  // #For Skeleton Loader
  skeletonData = [1, 2, 3, 4, 5, 6];
  swiper: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private orchService: OrchService,
    private orchestrationService:OrchestrationService,
    private errorService:ErrorService,
    public toast: ToastWidget,

  ) {
    if (isPlatform('capacitor')) {
      this.domainUrl = environment.capaciorUrl;
    } else {
      this.domainUrl = window.location.origin;
    }
   
    this.routeSub = this.route.params.subscribe(params => {
      this.movieId = params['id']; // Movie id is captured here
    });
  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }


  ngOnInit() {
    this.onGetMovieDetail();
    this.onGetTrending();
    console.log(this.movieId)
    this.onProductDetails();
  
  }
  async onProductDetails() {
    (await this.orchestrationService.getBooks()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.book = res.data.find((e: Book) => e.bookId == this.movieId);
          console.log(this.book)
        } else {
          this.errorService.onError(res);
        }
      },
      error: error => {
        this.errorService.onError(error);
      }
    });
  }
  
  incrementQuantity(book){
    this.orchestrationService.getBooks();
 
   }


  async onGetMovieDetail() {
    (await this.orchestrationService.getBooks()).subscribe(async response => {
      if (response.status.toLowerCase() === 'success' && response.statusCode == 200) {
        this.book = response.data;
        await this.orchService.movieOrchestrate(this.book);
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }

  

  async getSuggestions() {
    (await this.orchestrationService.getupcoming()).subscribe(async response => {
      if (response.status.toLowerCase() === 'success' && response.statusCode == 200) {
        this.suggestions = response.data;
        this.suggestions.map(cast => cast['posterurl'] = this.domainUrl + '/images' + cast.posterurl)
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }


  // dismiss() {
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }
  
  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }


  
  async onGetTrending() {
    (await this.orchestrationService.getTrending()).subscribe({
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

  ngAfterContentChecked(): void {
    if(this.swiper)
    {
      this.swiper.updateSwiper({})
      this.swiper.swiperRef.autoplay.start();
    }
}


async shareUs() {

  await Share.share({
    title: 'VRNA',
    text: 'New way of Streaming',
    url: this.router.url,
    dialogTitle: 'Share with buddies',
  });
}
}