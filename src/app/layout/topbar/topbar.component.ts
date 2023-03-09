import { Component, Input, OnInit } from '@angular/core';
import { themeService,THEME_KEY} from 'src/app/shared/services/theme/theme.service';
import { isPlatform, ModalController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { CartPageService } from 'src/app/pages/cart/cart.service';
import { Book } from 'src/app/shared/models/book.model';
import { ErrorService } from 'src/app/shared/services/error.service';
import{OrchestrationService} from 'src/app/shared/services/orchestration/orchestration.service';
import { Subscription,Subject } from 'rxjs';
import { ToastWidget } from 'src/app/shared/widgets/toast.widget';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';




export interface ProfileMenu {
  title: string,
  url: string,
  icon: string
}


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {

  cartItemCount: number;

  
  bookDtls: Book[];
  bookid:any;
  // public userId:"3434";
  @Input() data: Book;
  // routeSub: Subscription;

  cartitems:any;
  cartData = new Subject();
  currentTheme: boolean;
  public isMobile: boolean = false;
  





  profileMenus: ProfileMenu[] = [
    { title: 'My Account', url: '/account', icon: 'person-outline' },
    { title: 'Orders', url: '/account/orders', icon: 'archive-outline' },
    { title: 'Wishlist', url: '/account/wishlist', icon: 'heart-outline' },
  ];
  isOpen: any;

  constructor(
    private router:Router,
    private theme: themeService,
    public  modalController: ModalController,
    public cartService:CartPageService,
    private OrchService: OrchestrationService,
    private errorService: ErrorService,
    public toast: ToastWidget,
    private authService:AuthService,
    private UserService:UserService



    ){
    if (isPlatform('capacitor')) {
      this.isMobile = true;
    }
    this.getCurrentTheme();
  }

  ngOnInit() {
    this.getAllCartItems();
    
   }

  async getCurrentTheme() {
    const theme: any = await Storage.get({ key: THEME_KEY });
    if (theme.value === 'dark') {
      this.currentTheme = true;
    } else {
      this.currentTheme = false;
    }
  }

  onThemeChange(e: any) {
    console.log('THeme', this.currentTheme);
    if (e.detail.checked) {
      this.theme.onTheme('light');
    } else {
      this.theme.onTheme('dark');
    }
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }

  openCart(): void {
    this.isOpen.next(true);
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




RemoveToCart(cartitem:any){
  console.log("Inside { RemoveToCart} book-details.page.ts----->here "+cartitem.bookId);
  this.removeToCart(cartitem);
  this.removeFromCartArray(cartitem);
}
async removeToCart(cartitem: any) {
  const data = {
    // userId: "3434",
    userId:await this.UserService.getUserId(),
  
    bookId: cartitem.bookId
  };
  (
    await this.OrchService.removeCart(data)).subscribe(
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
  this.cartitems.splice(0, this.cartitems.length);
}

async onLogout() {
  // this.dismissSideMenu();
  await this.authService.logout();
}



















}
