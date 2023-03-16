import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestBooksComponent } from './latest-books.component';
import { LatestBooksPageRoutingModule } from './latest-books-routing.module';
import { IonicModule } from '@ionic/angular';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';


@NgModule({
  declarations: [
    LatestBooksComponent
  ],
  imports: [
    CommonModule,
    LatestBooksPageRoutingModule,
    IonicModule,
    ProductCardModule
  ]
})
export class LatestBooksModule { }
