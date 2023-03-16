import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingBooksComponent } from './trending-books.component';


const routes: Routes = [
  {
    path: '',
    component: TrendingBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrendingBooksPageRoutingModule {}
