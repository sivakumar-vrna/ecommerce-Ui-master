import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { BannerComponent } from './banner.component';

@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports:[
    BannerComponent
  ]
})
export class BannerModule { }
