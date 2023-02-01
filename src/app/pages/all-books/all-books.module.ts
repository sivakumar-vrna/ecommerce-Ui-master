import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllBooksPageRoutingModule } from './all-books-routing.module';

import { AllBooksPage } from './all-books.page';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllBooksPageRoutingModule,
    ProductCardModule
  ],
  declarations: [AllBooksPage]
})
export class AllBooksPageModule {}
