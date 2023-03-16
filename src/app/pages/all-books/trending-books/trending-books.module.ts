import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingBooksComponent } from './trending-books.component';
import { TrendingBooksPageRoutingModule } from './trending-books-routing.module';
import { IonicModule } from '@ionic/angular';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  declarations: [
    TrendingBooksComponent
  ],
  imports: [
    CommonModule,
    TrendingBooksPageRoutingModule,
    IonicModule,
    ProductCardModule
  ]
})
export class TrendingBooksModule { }
