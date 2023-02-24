import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPageRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';



@NgModule({
  declarations: [
    AddressComponent
  ],
  imports: [
    CommonModule,
    AddressPageRoutingModule
  ]
})
export class AddressModule { }
