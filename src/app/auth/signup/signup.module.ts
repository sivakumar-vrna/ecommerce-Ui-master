import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupPageRoutingModule } from './signup-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    // SignupComponent
  ],
  imports: [
    CommonModule,
    // SignupPageRoutingModule,
    IonicModule
  ]
})
export class SignupModule { }
