import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TrackPackageComponent } from './track-package.component';
import { TrackPackagePageRoutingModule } from './track-package-routing.module';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { FooterModule } from 'src/app/layout/footer/footer.module';


@NgModule({
  declarations: [
    TrackPackageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TrackPackagePageRoutingModule,
    TopbarModule,
    FooterModule
  ]
})
export class TrackPackageModule { }
