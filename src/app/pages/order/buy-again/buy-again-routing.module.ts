import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyAgainComponent } from './buy-again.component';
const routes: Routes = [
  {
    path: '',
    component:BuyAgainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyAgainPageRoutingModule {}
