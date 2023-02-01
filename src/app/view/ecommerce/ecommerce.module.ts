import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcommercePageRoutingModule } from './ecommerce-routing.module';

import { EcommercePage } from './ecommerce.page';
import { TopbarModule } from 'src/app/layout/topbar/topbar.module';
import { FooterModule } from 'src/app/layout/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcommercePageRoutingModule,
    TopbarModule,
    FooterModule
  ],
  declarations: [EcommercePage]
})
export class EcommerceModule {}
