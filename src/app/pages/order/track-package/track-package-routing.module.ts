import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackPackageComponent } from './track-package.component';
const routes: Routes = [
  {
    path: '',
    component:TrackPackageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackPackagePageRoutingModule {}
