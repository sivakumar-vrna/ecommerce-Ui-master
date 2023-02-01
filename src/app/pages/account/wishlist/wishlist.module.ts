import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishlistPageRoutingModule } from './wishlist-routing.module';

import { WishlistPage } from './wishlist.page';
import { FooterModule } from 'src/app/layout/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishlistPageRoutingModule,
    FooterModule
  ],
  declarations: [WishlistPage]
})
export class WishlistPageModule {}
