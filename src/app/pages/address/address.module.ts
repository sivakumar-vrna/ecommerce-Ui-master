import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPageRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AddressComponent
  ],
  imports: [
    CommonModule,
    AddressPageRoutingModule,
    IonicModule
  ]
})
export class AddressModule { }
