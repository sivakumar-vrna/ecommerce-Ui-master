import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveTrackComponent } from './live-track.component';
import { LiveTrackPageRoutingModule } from './track-package-routing.module';
import { IonicModule } from '@ionic/angular';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { FooterModule } from 'src/app/layout/footer/footer.module';

@NgModule({
  declarations: [
    LiveTrackComponent
  ],
  imports: [
    CommonModule,
    LiveTrackPageRoutingModule,
    IonicModule,
    TopbarModule,
    FooterModule
  ]
})
export class LiveTrackModule { }
