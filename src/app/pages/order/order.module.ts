import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageRoutingModule } from './order-routing.module';
import { IonicModule } from '@ionic/angular';
import { OrderComponent } from './order.component';
import { FooterModule } from 'src/app/layout/footer/footer.module';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { ProductCartModule } from './product-cart/product-cart.module';
import { TrendingSliderModule } from 'src/app/modules/trending-slider/trending-slider.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderPageRoutingModule,
    IonicModule,
    FooterModule,
    TopbarModule,
    ProductCartModule,
    TrendingSliderModule,
    ProductCardModule,
    SwiperModule
  ]
})
export class OrderModule { }
