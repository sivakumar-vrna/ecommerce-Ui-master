import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookDetailsPageRoutingModule } from './book-details-routing.module';

import { BookDetailsPage } from './book-details.page';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { SwiperModule } from 'swiper/angular';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { TrendingSliderModule } from 'src/app/modules/trending-slider/trending-slider.module';
import { BookDetailsService } from './book-details.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookDetailsPageRoutingModule,
    TopbarModule,
    SwiperModule,
    ProductCardModule,
    TrendingSliderModule,


  ],
  declarations: [
    BookDetailsPage
  ],
  exports: [
    BookDetailsPage,
  ],
  providers: [
    BookDetailsService
  ]
})
export class BookDetailsPageModule { }
