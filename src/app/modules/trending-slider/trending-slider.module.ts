import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingSliderComponent } from './trending-slider.component';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';


@NgModule({
  declarations: [
    TrendingSliderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    ProductCardModule
  ],
  exports: [
    TrendingSliderComponent
  ]
})
export class TrendingSliderModule { }
