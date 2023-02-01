import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[
    ProductCardComponent
  ]
})
export class ProductCardModule { }
