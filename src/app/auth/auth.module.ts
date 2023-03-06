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
  ]
})
export class AuthModule { }
