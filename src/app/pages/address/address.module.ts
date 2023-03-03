import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPageRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AddressComponent
  ],
  imports: [
    CommonModule,
    AddressPageRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddressModule { }
