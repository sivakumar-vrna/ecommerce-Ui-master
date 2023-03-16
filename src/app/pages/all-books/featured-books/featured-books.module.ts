import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedBooksComponent } from './featured-books.component';
import { FeaturedBooksPageRoutingModule } from './featured-books-routing.module';
import { IonicModule } from '@ionic/angular';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';



@NgModule({
  declarations: [
    FeaturedBooksComponent
  ],
  imports: [
    CommonModule,
    FeaturedBooksPageRoutingModule,
    IonicModule,
    ProductCardModule
  ]
})
export class FeaturedBooksModule { }
