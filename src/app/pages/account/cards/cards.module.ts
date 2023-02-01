import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardsPageRoutingModule } from './cards-routing.module';

import { CardsPage } from './cards.page';
import { FooterModule } from 'src/app/layout/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardsPageRoutingModule,
    FooterModule
  ],
  declarations: [CardsPage]
})
export class CardsPageModule {}
