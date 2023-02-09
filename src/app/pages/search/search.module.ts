import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { SearchPageRoutingModule } from './search-routing.module';
import { AllBooksPageModule } from '../all-books/all-books.module';
// import { PosterCardModule } from 'src/app/components/poster-card/poster-card.module';
// import { MovieDetailsPageModule } from '../movie-details/movie-details.module';

@NgModule({
  exports:[
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    AllBooksPageModule
    // PosterCardModule,
    // MovieDetailsPageModule
  ],
  declarations: [
    SearchPage,

    


  ]
})
export class SearchPageModule { }
