import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorDetailsPageRoutingModule } from './author-routing.module';
import { AuthorDetailsComponent } from './author-details.component';
import { IonicModule } from '@ionic/angular';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { AuthorBooksModule } from './author-books/author-books.module';
import { SwiperModule } from 'swiper/angular';
import { BooksModule } from './books/books.module';





@NgModule({
  declarations: [
    AuthorDetailsComponent
  ],
  imports: [
    CommonModule,
    AuthorDetailsPageRoutingModule,
    IonicModule,
    TopbarModule,
    AuthorBooksModule,
    SwiperModule,
    BooksModule,
  ]
})
export class AuthorDetailsModule { }
