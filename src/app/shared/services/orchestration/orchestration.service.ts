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
    const url = environment.contentUrl +'banner';
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
    let userId = await this.userService.getUserId();
    if (Number.isNaN(userId)){
      userId=0;
    }
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
  
  async removewatchitem(data){
    const userId = await this.userService.getUserId();
    const url = environment.watchlistUrl+'watchlist/'+ userId ;
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.deleteCall(url, capacitorUrl);



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
  // content['posterurl'] = this.domainUrl + '/images' + content.posterurl;
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
   const url =environment.vrnaFlowUrl +'processpayment';
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
  
  addprofile(postData){
    const url = environment.authUrl +'profile/add';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, postData);
  }
  
  async getOrderDetails(){
    const userId = await this.userService.getUserId();
    // const url = environment.orderUrl +'allorders?userId='+userId;
    const url ='http://170.187.138.204:8089/order-service/order/allorders?userId='+userId;
    const capaciorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url,capaciorUrl)
  }
  
async getAllAuthor(){
  const userId = await this.userService.getUserId();
  const url = environment.authorUrl +  'all?userId='+ userId;
  const capaciorUrl = environment.capaciorUrl + url;
  return this.http.getCall(url,capaciorUrl)

}
   
async getAuhtorDetails(authorId){
    const url = environment.authorUrl + authorId;
    const capaciorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url,capaciorUrl)
}

async getAuthorallBooks(bookId){
  const url = environment.authorUrl +'bookauthor?bookId='+ bookId;
  const capaciorUrl = environment.capaciorUrl + url;
  return this.http.getCall(url,capaciorUrl)
}

// async getAuthorallBooks(bookId) {
//   const url = environment.authorUrl + 'bookauthor?bookId=' + bookId; // remove extra forward slash
//   const capacitorUrl = environment.capacitorUrl + url;
//   return this.http.getCall(url, capacitorUrl);
// }


}
