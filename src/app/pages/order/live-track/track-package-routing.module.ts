import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveTrackComponent } from './live-track.component';
const routes: Routes = [
  {
    path: '',
    component:LiveTrackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveTrackPageRoutingModule {}
