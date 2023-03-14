import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorBooksPageRoutingModule } from './author-routing.module';
import { AuthorBooksComponent } from './author-books.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AuthorBooksComponent
  ],
  imports: [
    CommonModule,
    AuthorBooksPageRoutingModule,
    IonicModule
  ],
  exports:[
    AuthorBooksComponent

  ]
})
export class AuthorBooksModule { }
