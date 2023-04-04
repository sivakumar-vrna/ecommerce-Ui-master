import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from './topbar.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from 'src/app/modules/login/login.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';




@NgModule({
  declarations: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    LoginModule,
    AuthModule,
    FormsModule
  ],
  exports: [
    TopbarComponent
  ],
  providers: [Geolocation],
})

export class TopbarModule {}
