import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from './topbar.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from 'src/app/modules/login/login.module';
// import { CartPageModule } from 'src/app/pages/cart/cart.module';

@NgModule({
  declarations: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    LoginModule,
    // CartPageModule
  ],
  exports: [
    TopbarComponent
  ]
})
export class TopbarModule { }
