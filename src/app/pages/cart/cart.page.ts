import { AfterViewInit, Component, Input,Output,EventEmitter,  OnDestroy, OnInit,ViewChild,CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from '@angular/core';
import { Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Book } from 'src/app/shared/models/book.model';
import { ErrorService } from 'src/app/shared/services/error.service';
import { OrchestrationService } from 'src/app/shared/services/orchestration/orchestration.service';
import { Subscription } from 'rxjs';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { isPlatform } from '@ionic/core';
import { BookDetailsService } from '../book-details/book-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';



SwiperCore.use([Autoplay,Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: Book;
  @Input() bookId: number;
  @Output() cartItemCountChanged = new EventEmitter<number>();

  trendings: Book[];
  latest: Book[];
  featured: Book[];
  products = [];
  suggestions=[];
  bookid:any;
  domainUrl: string;
  cartContents :any [];
  public isOpen = new BehaviorSubject<boolean>(false);
  cartData = new Subject();
  movieId: number;
  routeSub: Subscription;
  book: Book;
  books:Array<{}>
  angularFirestore: any;
  userId: any;
  content:Book[];
  cartitems:any;


  config: SwiperOptions = {
    slidesPerView: 7,
    spaceBetween: 10,
    preloadImages: true,
    // loop: true,
    navigation: true,
    // pagination: { clickable: true },
    scrollbar: false,
    autoplay:true
  };
  @ViewChild('bookSwiper', { static: false }) swiper?: SwiperComponent;

    // #For Skeleton Loader
    skeletonData = [1, 2, 3, 4, 5, 6];
    


  constructor(
    @Inject(DOCUMENT) private document: Document,
    public NavController:NavController,
    private orchService: OrchestrationService,
    public toast: ToastWidget,
    private errorService: ErrorService,
    private bookDetailsService:BookDetailsService,
    private route: ActivatedRoute,
    private router: Router,
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
   ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
   ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
     this.getAllCartItems();
   }

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

  remove(no){
     this.cartitems.splice( no,1);
  }




  deleteSpace(book: Book): void {
    console.log('book.id',book)
      this.setisDeleted(book);
  }

  setisDeleted(book): Promise<any> {
    const isDeleted = true;
    return this.angularFirestore
    .collection('accounts')
    .doc(this.userId)
    .collection("books")
    .doc(book.bookId)
    .update({ isDeleted })
  }
  async getSuggestions() {
    (await this.orchService.getupcoming()).subscribe({
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
  async getUserCart() {
    await this.getAllCartItems();
  }

async getAllCartItems() {
    (await this.orchService.getCartItems()).subscribe(
        (res: any) => {
            if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
                const tempData = res.data;
                this.cartitems= res.data;
                console.log("cartitems");
                console.log(this. cartitems);
                this.cartData.next(this.orchService.orchestrateData(tempData));
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




RemoveToCart(cartitem:any){
  console.log("Inside { RemoveToCart} book-details.page.ts----->here "+cartitem.bookId);
  this.removeToCart(cartitem);
  this.removeFromCartArray(cartitem);
}
async removeToCart(cartitem: any) {
  const data = {
    userId: "3434",
    bookId: cartitem.bookId
  };
  (
    await this.orchService.removeCart(data)).subscribe(
    (res: any) => {
      if (res.status.toLowerCase() === 'success' && res.statusCode == 200) {
        this.toast.onSuccess(res.message);
        window.alert(data.bookId+'book remove successfully! ');
        
        // Update cartItems array and save to localStorage
        // const index = this.cartitems.indexOf(cartitem);
        // if (index !== -1) {
        //   this.cartitems.splice(index, 1);
        //   localStorage.setItem('cartItems', JSON.stringify(this.cartitems));
        // }
      } else {
        this.toast.onFail('Error in the request');
      }
    }, (err: any) => {
      this.toast.onFail('Network Error');
    }
  )
}
  
removeFromCartArray(cartitem: any) {
  const index = this.cartitems.indexOf(cartitem);
  if (index !== -1) {
    this.cartitems.splice(index, 1);
    
  }
}
clearCart() {
  // this.cartitems = [];
  
  this.cartitems.splice(0, this.cartitems.length);
}





























}
