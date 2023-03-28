import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorPageRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthorComponent ,
  ],

  imports: [
    CommonModule,
    AuthorPageRoutingModule,
    IonicModule,
    FormsModule,
    TopbarModule,
    RouterModule
  ],
})

export class AuthorModule { }
