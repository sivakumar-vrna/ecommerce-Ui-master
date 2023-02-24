import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageRoutingModule } from './order-routing.module';
import { IonicModule } from '@ionic/angular';
import { OrderComponent } from './order.component';
import { FooterModule } from 'src/app/layout/footer/footer.module';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderPageRoutingModule,
    IonicModule,
    FooterModule,
    TopbarModule
  ]
})
export class OrderModule { }
