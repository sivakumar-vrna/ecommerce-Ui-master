import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { FooterModule } from 'src/app/layout/footer/footer.module';
import { TrendingSliderModule } from 'src/app/modules/trending-slider/trending-slider.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    FooterModule,
    TrendingSliderModule
  ],
  declarations: [ProductPage]
})
export class ProductPageModule {}
