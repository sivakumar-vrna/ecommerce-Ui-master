import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletePageRoutingModule } from './complete-routing.module';
import { CompleteComponent } from './complete.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    CompleteComponent
  ],
  imports: [
    CommonModule,
    CompletePageRoutingModule,
    IonicModule
  ]
})
export class CompleteModule { }
