import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { IonicModule } from '@ionic/angular';

import { AllBooksPageRoutingModule } from './all-books-routing.module';

import { AllBooksPage } from './all-books.page';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  exports: [
    AllBooksPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllBooksPageRoutingModule,
    ProductCardModule,
    TopbarModule
  ],
  declarations: [AllBooksPage]
})
export class AllBooksPageModule {}
