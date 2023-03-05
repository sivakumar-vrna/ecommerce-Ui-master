import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelledOrdersComponent } from './cancelled-orders.component';
import { CancelledOrdersPageRoutingModule } from './cancelld-orders-routing.module';
import { IonicModule } from '@ionic/angular';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { CartModule } from './cart/cart.module';
import { SwiperModule } from 'swiper/angular';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { FooterModule } from 'src/app/layout/footer/footer.module';


@NgModule({
  declarations: [
    CancelledOrdersComponent
  ],
  imports: [
    CommonModule,
    CancelledOrdersPageRoutingModule,
    IonicModule,
    TopbarModule,
    CartModule,
    SwiperModule,
    ProductCardModule,
    FooterModule
  ]
})
export class CancelledOrdersModule { }
