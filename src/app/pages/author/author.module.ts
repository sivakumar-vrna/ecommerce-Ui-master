import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorPageRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';



@NgModule({
  declarations: [
    AuthorComponent 
  ],
  imports: [
    CommonModule,
    AuthorPageRoutingModule
  ]
})
export class AuthorModule { }
