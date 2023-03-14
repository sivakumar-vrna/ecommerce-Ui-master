import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { IonicModule } from '@ionic/angular';
import { BookDetailsPageRoutingModule } from '../../book-details/book-details-routing.module';



@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    BookDetailsPageRoutingModule
  ],
  exports:[
    BooksComponent
  ]
})
export class BooksModule { }
