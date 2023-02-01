import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { FooterModule } from 'src/app/layout/footer/footer.module';
import { TrendingSliderModule } from 'src/app/modules/trending-slider/trending-slider.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    FooterModule,
    TrendingSliderModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
