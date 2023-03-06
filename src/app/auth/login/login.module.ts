import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginPageRoutingModule } from './login-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    // LoginComponent
  ],
  imports: [
    CommonModule,
    // LoginPageRoutingModule,
    IonicModule,
  ]
})
export class LoginModule { }
