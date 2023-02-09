import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { BannerModule } from 'src/app/components/banner/banner.module';
import { FooterModule } from 'src/app/layout/footer/footer.module';
import { SwiperModule } from 'swiper/angular';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ProductCardModule,
    BannerModule,
    FooterModule,
    SwiperModule,
    TopbarModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
