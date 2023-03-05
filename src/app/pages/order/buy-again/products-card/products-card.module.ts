import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ProductsCardComponent } from './products-card.component';

@NgModule({
  declarations: [ProductsCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[
    ProductsCardComponent
  ]
})
export class ProductsCardModule { }
