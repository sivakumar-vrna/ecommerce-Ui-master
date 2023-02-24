import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCardPageRoutingModule } from './add-card-routing.module';
import { AddCardComponent } from './add-card.component';



@NgModule({
  declarations: [
    AddCardComponent
  ],
  imports: [
    CommonModule,
    AddCardPageRoutingModule
  ]
})
export class AddCardModule { }
