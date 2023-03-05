import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelledOrdersComponent } from './cancelled-orders.component';
const routes: Routes = [
  {
    path: '',
    component:CancelledOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelledOrdersPageRoutingModule {}
