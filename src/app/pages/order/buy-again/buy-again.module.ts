import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyAgainComponent } from './buy-again.component';
import { BuyAgainPageRoutingModule } from './buy-again-routing.module';
import { IonicModule } from '@ionic/angular';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { FooterModule } from 'src/app/layout/footer/footer.module';
import { ProductsCardModule } from './products-card/products-card.module';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    BuyAgainComponent
  ],
  imports: [
    CommonModule,
    BuyAgainPageRoutingModule,
    IonicModule,
    TopbarModule,
    FooterModule,
    ProductsCardModule,
    SwiperModule
  ]
})
export class BuyAgainModule { }
