import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { FooterModule } from 'src/app/layout/footer/footer.module';
import { TrendingSliderModule } from 'src/app/modules/trending-slider/trending-slider.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    FooterModule,
    TrendingSliderModule
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
