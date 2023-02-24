import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveCardPageRoutingModule } from './save-card-routing.module';
import { SaveCardComponent } from './save-card.component';



@NgModule({
  declarations: [
    SaveCardComponent
  ],
  imports: [
    CommonModule,
    SaveCardPageRoutingModule
  ]
})
export class SaveCardModule { }
