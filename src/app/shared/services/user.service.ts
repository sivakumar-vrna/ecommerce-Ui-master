import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { COUNTRY_KEY } from './ui-orchestration/orch.service';
import {
  MAC_KEY,
  STRIPE_KEY,
  TOKEN_KEY,
  USERNAME_KEY,
  USER_KEY,
} from './auth/auth.service';
import { RENTED_KEY } from './intelligence.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  async getRentedMoviesList() {
    const tempData = await Storage.get({ key: RENTED_KEY });
    const rentedList = JSON.parse(tempData.value);
    return rentedList;
  }

  async getCurrentToken() {
    const userToken = await Storage.get({ key: TOKEN_KEY });
    return userToken.value;
  }

  async getUniqueId() {
    const uId = await Storage.get({ key: MAC_KEY });
    return uId.value;
  }

  async getUserId(): Promise<number> {
    const id = await Storage.get({ key: USER_KEY });
    
    if (id){
    const id = await Storage.get({ key: USER_KEY });
    console.log("inside if for userid chcek")
    id.value="3434";
    return parseInt(id.value);

    }
    else {
      console.log("inside if for nan chcek")
      id.value="3434";
      return parseInt(id.value);
      
    }
    // return parseInt(id.value);
    
  }

  async getEmail(): Promise<string> {
    const email = await Storage.get({ key: USERNAME_KEY });

    if (email)
    {
    const email = await Storage.get({ key: USERNAME_KEY });
      console.log("inside if for null check");
      email.value="kannan.gb@vrnaplex.com"; 
      return email.value;
    }

    else {
      console.log("inside else for null check ")
      email.value="kannan.gb@vrnaplex.com"; 
      return email.value;
    }
  }

  async getStripeId() {
    const stripe = await Storage.get({ key: STRIPE_KEY });
    return stripe.value;
  }

  async getCountryCode() {
    const country = await Storage.get({ key: COUNTRY_KEY });
    return country.value;
  }

  async onAuth(): Promise<boolean> {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      return true;
    } else {
      return false;
    }
  }
}
