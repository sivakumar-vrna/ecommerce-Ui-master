import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllBooksPage } from './all-books.page';

const routes: Routes = [
  {
    path: '',
    component: AllBooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllBooksPageRoutingModule {}
