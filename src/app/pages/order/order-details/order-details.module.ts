import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import { OrderDetailsPageRoutingModule } from './order-details-routing.module';
import { IonicModule } from '@ionic/angular';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { SwiperModule } from 'swiper/angular';
import { FooterModule } from 'src/app/layout/footer/footer.module';



@NgModule({
  declarations: [
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderDetailsPageRoutingModule,
    IonicModule,
    TopbarModule,ProductCardModule,
    SwiperModule,
    FooterModule
  ]
})
export class OrderDetailsModule { }
