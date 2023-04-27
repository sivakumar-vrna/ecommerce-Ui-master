import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthPageRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupPage } from './signup/signup.page';
import { LoginPage } from './login/login.page';
import { ForgotPwdPage } from './forgot-pwd/forgot-pwd.page';
import { IntroPageModule } from './intro/intro.module';
// import { PasswordModule } from '../components/password/password.module';
// import { GoogleAuthModule } from './social/google-auth/google-auth.module';
// import { FbAuthModule } from './social/fb-auth/fb-auth.module';
import { GoogleAuthModule } from './social/google-auth/google-auth.module';
import { FbAuthModule } from './social/fb-auth/fb-auth.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginPage,
    SignupPage,
    ForgotPwdPage
    
  ],
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    IntroPageModule,
    GoogleAuthModule,
    // FbAuthModule,
    // PasswordModule
  ]
})
export class AuthModule { }
