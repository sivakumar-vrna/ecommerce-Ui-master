import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastWidget } from '../shared/widgets/toast.widget';
import { Storage } from '@capacitor/storage';
import {
  AuthService,
  MAC_KEY,
  STRIPE_KEY,
  TOKEN_KEY,
  USERNAME_KEY,
  USER_KEY,
} from '../shared/services/auth/auth.service';
import { ProfileService } from '../shared/services/profile.service';



@Injectable({
  providedIn: 'root',
})

export class AuthCommonService {

  constructor(
      private router: Router,
      public toast: ToastWidget,
      private authservice: AuthService,
      private profileService: ProfileService,
  ) { }

  // #After Successfull login
  async afterLogin(userData: any, macId: any, token: string) {
      console.log('After Login Successfully');
      Storage.set({ key: USER_KEY, value: JSON.stringify(userData.userId) });
      Storage.set({ key: USERNAME_KEY, value: userData.email });
      Storage.set({ key: STRIPE_KEY, value: userData.stripeId });
      Storage.set({ key: TOKEN_KEY, value: token });
      Storage.set({ key: MAC_KEY, value: macId });
      this.authservice.isAuthenticated.next(true);

      (await this.profileService.getProfileImgUploadUrl()).subscribe(res => {
          console.log('Image URL');
          console.log(res);
      })
      // TODO: Navigate to home page after authentication
      await this.router.navigate(['/home']);
  }
}
