import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TrackPackageComponent } from './track-package.component';
import { TrackPackagePageRoutingModule } from './track-package-routing.module';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';



@NgModule({
  declarations: [
    TrackPackageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TrackPackagePageRoutingModule,
    TopbarModule
  ]
})
export class TrackPackageModule { }
