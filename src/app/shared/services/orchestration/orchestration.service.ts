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
  
  // top ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/orchestration-service/event/menu?userId=3424&menuName=top';
  
  // allbooks ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/activebooks';

  // upcoming ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/upcoming?userId=112245';

  // bookDetailsURL ='http://ec2-3-129-58-233.us-east-2.compute.amazonaws.com:8099/book-service/book/';

  // addCartURL = 'http://170.187.138.204:8089/customer-service/cart/add';

  // removeCartURL ='http://170.187.138.204:8089/customer-service/cart/delete?userId=3424&';

  // getCartItemsURL ='http://170.187.138.204:8089/customer-service/cart/get?userId=3434';

  // addWishURL='http://170.187.138.204:8089:8099/customer-service/watchlist/add';

  // getWishListURl='http://170.187.138.204:8089/customer-service/watchlist/3434';

  // AddCustomerCard='http://170.187.138.204:8089/payment-service/payment/addCustomerCard';
  
  // processpayment='http://170.187.138.204:8089/payment-service/payment/processPayment';

  // getcards='http://170.187.138.204:8089/payment-service/payment/cardinfo?userName=vinoth';

  // getAddress='http://170.187.138.204:8089/user-service/address/all?userId=3434';
  
  // AddaddressURL='http://170.187.138.204:8089/user-service/address/add';
 
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

  async getBanner() {
    const url = environment.contentUrl +'book/banner';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, capacitorUrl + url);
  }

  async getTrending() {
    let userId = await this.userService.getUserId();
    console.log("first time login");
    console.log(userId);
    if (Number.isNaN(userId)){
      userId=0;
    }
    console.log("after if");
    console.log(userId)
    const url= environment.contentUrl +'trending?userId='+userId;
      
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, capacitorUrl+ url);
  }
  

  async getLatest() {
    // console.log("inside  getLatest");
    let userId = await this.userService.getUserId();
    // console.log("first time login"); 
    // console.log(userId);
    if (Number.isNaN(userId)){
      userId=0;
    }
    // console.log("after if");
    // console.log(userId)
    const url = environment.contentUrl +'latest?userId='+userId;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url,capacitorUrl + url);
  }

  async getfeatured() {
    
    let userId = await this.userService.getUserId();
    if (Number.isNaN(userId)){
      userId=0;
    }
    const url = environment.contentUrl + 'featured?userId='+userId;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url,capacitorUrl + url);
  }

  async getBooks() {
    const url = environment.contentUrl +'activebooks';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url,capacitorUrl + url);
  }

  
  async getBookDetails(bookId) {
    console.log('{orchestration service }  ---- {}getBookDetails-----here ');
    const url= environment.vrnaFlowUrl +'book/'+ bookId;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url,capacitorUrl + url);
  }
  


  async addToCart(content: any) {
    // const userId = await this.userService.getUserId();
    const url = environment.watchlistUrl +'cart/add';
    console.log('inside {addCartURL}---------->');
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, content);
  }
  
  async getCartItems(){
    const userId = await this.userService.getUserId();
    const url =environment.watchlistUrl +'cart/get?userId='+userId;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, capacitorUrl + url);
  }
  
  
  async removeCart(data){
    const userId = await this.userService.getUserId();
    const url = environment.watchlistUrl+'cart/delete?userId='+ userId + '&bookId='+ + data.bookId;
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
  // content['posterurl'] = this.domainUrl + '/images' + content.posterurl;
  content['cost']='650';
}

  async getupcoming() {
    const userId = await this.userService.getUserId();
    const url = environment.contentUrl+'upcoming?userId='+ userId;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, capacitorUrl + url);
  }
  get domainUrl() {
    if (isPlatform('capacitor')) {
        return environment.capaciorUrl;
    } else {
        return window.location.origin;
    }
}


addToWish(content: any) {
  const url = environment.watchlistUrl +'watchlist/add';
  console.log('inside {addCartURL}---------->');
  const capacitorUrl = environment.capaciorUrl + url;
  return this.http.postCall(url, capacitorUrl, content);
}

async getWishList() {
  const userId = await this.userService.getUserId();
  const url = environment.watchlistUrl+'watchlist/'+userId;
  const capacitorUrl = environment.capaciorUrl + url;
  return this.http.getCall(url, capacitorUrl + url);
}

getCartItemsCount() {
    return this.cartItemsCount.asObservable();
  }

  updateCartItemsCount(count: number) {
    this.cartItemsCount.next(count);
  }
  
  async onPayment(postData) {
   const url =environment.paymentUrl +'payment/processPayment';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, postData);
  }

  
  async addcustomercard(postData) {
    const url = environment.paymentUrl +'payment/addCustomerCard';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, postData);
  }
  
  async getSavedCards(): Promise<Observable<any>> {
    const userName = await this.userService.getEmail();
    const url =environment.paymentUrl +`payment/cardinfo?userName=${userName}`;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, capacitorUrl);
  }

  async postDeleteCards(postData) {
   const url = environment.paymentUrl+'payment/deleteCustomerCard';
   const capaciorUrl = environment.capaciorUrl + url;
   return this.http.postCall(url,capaciorUrl, postData)
  }


  async getSavedAddress(): Promise<Observable<any>> {
    const userId = await this.userService.getUserId();
    const url = environment.authUrl + 'address/all?userId='+userId;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, capacitorUrl);
  }
  
  async addAddress(postData) {
    const url =environment.authUrl +'address/add';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, postData);
  }

  async deleteAddress() {
    const userId = await this.userService.getUserId();
    const url =environment.authUrl +`address/${userId}`;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.deleteCall(url, capacitorUrl);
  }

  async updateAddress(updatedData) {
    // const userId = await this.userService.getUserId();
    const url =environment.authUrl + 'address/update';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl,updatedData);
  }

  


 

}