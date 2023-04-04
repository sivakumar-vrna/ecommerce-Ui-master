import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpService,
    private userService: UserService
  ) { }

  async addCard(postData) {
    const url = environment.paymentUrl +'payment/addCustomerCard';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, postData);
  }
  
  async deleteCard(postData) {
    const url = environment.paymentUrl+'payment/deleteCustomerCard';
    const capaciorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url,capaciorUrl, postData)
   }
 

  async getSavedCards(): Promise<Observable<any>> {
    const userName = await this.userService.getEmail()
    const baseUrl = environment.paymentUrl + 'payment';
    const url = baseUrl + `/cardinfo?userName=${userName}`
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.getCall(url, capacitorUrl);
  }
  

  async onPayment(postData) {
    const url = environment.vrnaFlowUrl+ 'processpayment';
    const capacitorUrl = environment.capaciorUrl + url;
    return this.http.postCall(url, capacitorUrl, postData);
  }

}
