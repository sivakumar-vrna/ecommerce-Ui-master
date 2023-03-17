import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
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
    TrendingSliderModule,
    TopbarModule,
    SwiperModule,
    ProductCardModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {
  static getAllCartItems() {
    throw new Error('Method not implemented.');
  }
}
