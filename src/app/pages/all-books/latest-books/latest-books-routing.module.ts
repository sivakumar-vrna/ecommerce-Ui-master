import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LatestBooksComponent } from './latest-books.component';


const routes: Routes = [
  {
    path: '',
    component: LatestBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LatestBooksPageRoutingModule {}
