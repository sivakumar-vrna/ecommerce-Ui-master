import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';
import { isPlatform } from '@ionic/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';



@Injectable({
  providedIn: 'root',
})
export class OrchestrationService {
  clearCart() {
    throw new Error('Method not implemented.');
  }
  stripe: any;

  private cartItemsCount = new BehaviorSubject<number>(0);

  banner ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/banner';

  latest ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=latest';

  Trending ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=trending';

  featured ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=featured';

  top ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=top';

  allbooks ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/activebooks';

  upcoming ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/upcoming?userId=112245';

  bookDetailsURL ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/';

  addCartURL = 'http://170.187.138.204:8089/customer-service/cart/add';

  removeCartURL ='http://170.187.138.204:8089/customer-service/cart/delete?userId=3424&';

  getCartItemsURL ='http://170.187.138.204:8089/customer-service/cart/get?userId=3434';

  addWishURL='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/customer-service/watchlist/add';

  getWishListURl='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/customer-service/watchlist/3424';

  AddCustomerCard='http://170.187.138.204:8089/payment-service/payment/addCustomerCard';
  
  processpayment='http://170.187.138.204:8089/payment-service/payment/processPayment';

  getcards='http://170.187.138.204:8089/payment-service/payment/cardinfo?userName=vinoth';
  constructor(
    private http: HttpService,
    private userService: UserService
    ) {}

  async header(){
    const headers = {
      'Content-Type': 'application/json',
      userName: 'satheshjkv@gmail.com',
      macAddress: '123456789',
      authToken: 'YTUzYzM1NTQtZGFkYi00ZjI3LWJlN2YtZTFjZmVjZDRiY2M3',
      country: 'IN',
    };
    return headers;
  }

  async getBanner(country) {
    // return this.http.get<any>("assets/banners.json"); // replace these path with url's eg: https://domain.com/orchservice/?menuName=banner
    const url = this.banner;
    return this.http.getCall(url, environment.capaciorUrl + url);
  }

  async getTrending() {
    const url = this.Trending;
    return this.http.getCall(url, environment.capaciorUrl + url);
    // return this.http.get<any>("assets/trending.json");
  }

  async getLatest() {
    const url = this.latest;
    return this.http.getCall(url, environment.capaciorUrl + url);
    // return this.http.get<any>("assets/latest.json");
  }

  async getfeatured() {
    const url = this.featured;
    return this.http.getCall(url, environment.capaciorUrl + url);
    // return this.http.get<any>("assets/latest.json");
  }

  async getBooks() {
    const url = this.allbooks;
    return this.http.getCall(url, environment.capaciorUrl + url);
  }
  async getBookDetails(bookId) {
    console.log('{orchestration service }  ---- {}getBookDetails-----here ');
    const url = this.bookDetailsURL;
    return this.http.getCall(url, environment.capaciorUrl + url);
    // return this.http.get<any>("assets/books.json");
  }
  addToCart(content: any) {
    const url = this.addCartURL;
    console.log('inside {addCartURL}---------->');
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, content);
  }
  
  async getCartItems() {
    const url = this.getCartItemsURL;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, environment.capaciorUrl + url);
    
  }
  
  removeCart(data){
    const url = this.removeCartURL + 'bookId=' + data.bookId;
    console.log( url)
    console.log('inside {removeCartURL}---------->');
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, data);
  }
  
  orchestrateData(data: any) {
    let tempData: any[] = [];
    if (data !== null && data[0]) {
        const tempContentsList = data;
        tempContentsList.map(async (content: any) => {
            await this.contentOrchestrate(content);
        });
        tempData = tempContentsList;
        return tempData;
    } else {
        return null;
    }
}

async contentOrchestrate(content: any) {
  const cart: any[] = [];
  content['bannerurl'] = this.domainUrl + '/images' + content.bannerurl;
  content['posterurl'] = ' https://wallpaperaccess.com/full/3421332.jpg';



}
  async getupcoming() {
    const url = this.upcoming;
    return this.http.getCall(url, environment.capaciorUrl + url);
  }
  get domainUrl() {
    if (isPlatform('capacitor')) {
        return environment.capaciorUrl;
    } else {
        return window.location.origin;
    }
}


addToWish(content: any) {
  const url = this.addWishURL;
  console.log('inside {addCartURL}---------->');
  const capacitorUrl = environment.capaciorUrl + url;
  return this.http.postCall(url, capacitorUrl, content);
}
async getWishList() {
  const url = this.getWishListURl;
  const capacitorUrl = environment.capaciorUrl + url;
  return this.http.getCall(url, environment.capaciorUrl + url);
}


  async addcustomercard(postData) {
    const url =this.AddCustomerCard;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, postData);
  }


  getCartItemsCount() {
    return this.cartItemsCount.asObservable();
  }

  updateCartItemsCount(count: number) {
    this.cartItemsCount.next(count);
  }

  
  async onPayment(postData) {
    const baseUrl =this.processpayment;
    const url = baseUrl;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, postData);
  }

 


  async getSavedCards(): Promise<Observable<any>> {
    const userName = await this.userService.getEmail();
    const url =`http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/payment-service/payment/cardinfo?userName=${userName}`;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, capacitorUrl);
  }
  

 

}