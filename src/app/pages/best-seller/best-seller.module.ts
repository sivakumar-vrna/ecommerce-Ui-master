import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellerPageRoutingModule } from './best-seller-routing.module';
import { BestSellerComponent } from './best-seller.component';



@NgModule({
  declarations: [
    BestSellerComponent
  ],
  imports: [
    CommonModule,
    BestSellerPageRoutingModule
  ]
})
export class BestSellerModule { }
