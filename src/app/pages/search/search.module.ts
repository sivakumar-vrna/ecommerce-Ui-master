import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';
import { SearchPageRoutingModule } from './search-routing.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { SwiperModule } from 'swiper/angular';
import { Routes, RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    ProductCardModule,
    SwiperModule,
    RouterModule
  ],
  exports: [RouterModule],
  declarations: [
    SearchPage
  ]
})
export class SearchPageModule { }
