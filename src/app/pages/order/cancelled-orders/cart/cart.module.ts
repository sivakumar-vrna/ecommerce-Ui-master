import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartPageRoutingModule } from './cart-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartPageRoutingModule,
    IonicModule
  ],
  exports:[
    CartComponent
  ]
})
export class CartModule { }
