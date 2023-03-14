import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorBooksComponent } from './author-books.component';

const routes: Routes = [
  {
    path: '',
    component:AuthorBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorBooksPageRoutingModule {}
