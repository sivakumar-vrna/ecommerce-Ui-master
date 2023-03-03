import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCartComponent } from './product-cart.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    ProductCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    ProductCartComponent
    
  ]
})
export class ProductCartModule { }
