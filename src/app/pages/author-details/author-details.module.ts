import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorDetailsPageRoutingModule } from './author-routing.module';
import { AuthorDetailsComponent } from './author-details.component';


@NgModule({
  declarations: [
    AuthorDetailsComponent
  ],
  imports: [
    CommonModule,
    AuthorDetailsPageRoutingModule
  ]
})
export class AuthorDetailsModule { }
