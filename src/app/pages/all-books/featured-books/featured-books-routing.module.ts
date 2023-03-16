import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturedBooksComponent } from './featured-books.component';

const routes: Routes = [
  {
    path: '',
    component:  FeaturedBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedBooksPageRoutingModule {}
