import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCardRoutingModule } from './add-card-routing.module';
import { AddCardComponent } from './add-card.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AddCardComponent
  ],
  imports: [
    CommonModule,
    AddCardRoutingModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [DatePipe],

})
export class AddCardModule { }
