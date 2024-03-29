import { AfterViewInit, Component,ViewChild, Input, OnDestroy, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { isPlatform, ModalController } from '@ionic/angular';
import { BackgroundColorOptions } from '@capacitor/status-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription,Subject } from 'rxjs';
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
import { UserService } from 'src/app/shared/services/user.service';




SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})

@Injectable({
  providedIn:'root'
})
export class BookDetailsPage implements OnInit, AfterViewInit, OnDestroy {
  @Input() data:Book;
  @ViewChild('popover') popover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  cart = [];
  products = [];
  bookId: number;
  routeSub: Subscription;
  book: Book;
  showBanner = false;
  banner:any;
  casts: any;
  userId:any;
  isLoading = true;
  suggestions = [];
  trendings: Book[];
  placeholder = 'assets/images/placeholder-banner.webp';
  cartitems:any;
  cartData = new Subject();

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
  skeletonData = [1, 2, 3, 4, 5, 6]
  swiper: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public  modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private orchService: OrchService,
    private OrchService:OrchestrationService,
    private errorService:ErrorService,
    public  toast: ToastWidget,
    private UserService:UserService

  ) {
    if (isPlatform('capacitor')) {
      this.domainUrl = environment.capaciorUrl;
    } else {
      this.domainUrl = window.location.origin;
    }

    this.routeSub = this.route.params.subscribe(params => {
      this.bookId = params['id']; // Movie id is captured here
    });
  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }


  ngOnInit() {
    this.onGetBookDetail();
    this.onGetTrending();
    console.log("{Inside ngOnInit book-details.page.ts ----------->}"+this.bookId)
    // this.onProductDetails();
    console.log("calling add to cart from {ngOnInit}----->> "+ this.data)
  }
  

  addToCart(){
    console.log("Inside { addToCart} book-details.page.ts----->here "+this.bookId);
    this.addCourseToCart(this.book);
  }
  
  async addCourseToCart(book: any) {
    const data = {
      userId:await this.UserService.getUserId(),
      bookId: this.bookId,
      count: 1,
    };
    console.log("{this is the book id to add to cart--->> Last step}"+ data.bookId);

   

    (await this.OrchService.addToCart(data)).subscribe(
      (res: any) => {
        if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
          this.toast.onSuccess(res.message);
          window.alert(data.bookId+'book added successfully! ');
        } else {
          this.toast.onFail('Error in the request');
        }
      }, (err: any) => {
        this.toast.onFail('Network Error');
      }
    )
  }


  

async getAllCartItems() {
  (await this.OrchService.getCartItems()).subscribe(
      (res: any) => {
          if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
              const tempData = res.data;
              this.cartitems= res.data;
              console.log("cartitems");
              console.log(this. cartitems);
              this.cartData.next(this.OrchService.orchestrateData(tempData));
              console.log(this.cartData)

            
          } else {
              this.errorService.onError(res);
          }
      },
      (err) => {
          this.errorService.onError(err);
      }
  );
}



  addToWishList(){
    console.log("Inside { addTowishlist} book-details.page.ts----->here "+this.bookId);
    this.addCourseToWish(this.book);
  }
  
  async addCourseToWish(book: any) {
    const data = {
      userId:await this.UserService.getUserId(),
      bookId: book.bookId,
      bookname:book.bookname,
      posterurl:book.posterurl,
      pauseTime:book.page,
      continuewatching:true,
      percentWatched:0,
      playTime:0,
      cost:book.cost,
      description:book.description,
      seller:book.seller,
      author:book.authorName,

    };
    console.log("{this is the book id to add to wish--->> Last step}"+ data.bookId);
    
    (await this.OrchService.addToWish(data)).subscribe(
      (res: any) => {
        if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
          this.toast.onSuccess(res.message);
          window.alert(data.bookId+'book added successfully! ');
        } else {
          this.toast.onFail('Error in the request');
        }
      }, (err: any) => {
        this.toast.onFail('Network Error');
      }
    )
  }


  async onProductDetails() {
    (await this.OrchService.getBooks()).subscribe({
      next: (res: any) => {
        if (res?.status?.toLowerCase() === 'success' && res?.statusCode == 200) {
          this.book = res.data.find((e: Book) => e.bookId == this.bookId);
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
    this.OrchService.getBooks();

   }


  async onGetBookDetail(){ 

    (await this.OrchService.getBookDetails(this.bookId)).subscribe(async response => {
      if (response.status.toLowerCase() === 'success' && response.statusCode == 200) {
        this.book = response.data;
        await this.orchService.bookOrchestrate(this.book);
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }



  async getSuggestions() {
    (await this.OrchService.getupcoming()).subscribe(async response => {
      if (response.status.toLowerCase() === 'success' && response.statusCode == 200) {
        this.suggestions = response.data;
        this.suggestions.map(cast => cast['posterurl'] = this.domainUrl + '/images' + cast.posterurl)
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
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


