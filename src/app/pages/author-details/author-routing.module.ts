import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorDetailsComponent } from './author-details.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorDetailsPageRoutingModule {}
