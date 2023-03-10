import { Book } from 'src/app/shared/models/book.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {CartPage} from './cart.page';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
@Injectable({
    providedIn: 'root'
})

export class CartPageService {

  // onGetCartDetailsURL=' http://170.187.138.204:8089/customer-service/cart/get?userId=3434';

    constructor(
        public modalController: ModalController,
        private router: Router,
        private http: HttpService,
        private userService:UserService

    ) { }
    async header() {
      const headers = {
        'Content-Type': 'application/json',
         'userName':'satheshjkv@gmail.com',
         'macAddress':'123456789',
         'authToken':'YTUzYzM1NTQtZGFkYi00ZjI3LWJlN2YtZTFjZmVjZDRiY2M3',
         'country':'IN'
      };
      return headers;
    }
    async cartModal(id: number) {
        const modal = await this.modalController.create({
            component: CartPage,
            cssClass: 'cart-details-modal',
            componentProps: {
                'bookId': id,
                'bookName':"bookName",
                'posterUrl':'"https://wallpaperaccess.com/full/3421332.jpg',
                'authorName':"Neeraja Viswanathan",
            }
        });
        await modal.present();

        const { role } = await modal.onDidDismiss();

        this.router.navigate([], {
            queryParams: {
                'bookId': id,
            },
            queryParamsHandling: 'merge'
        })
    }
    async onGetCartDetails() {

      console.log("Inside {onGetCartDetails} -->> cart.service --- here ")
      // const url = this.onGetCartDetailsURL;
      const userId = await this.userService.getUserId();
      const url =environment.watchlistUrl +'cart/get?userId='+ userId;
      return this.http.getCall(url, environment.capaciorUrl+url);

     // return this.http.get<any>("assets/trending.json");

   }
}
