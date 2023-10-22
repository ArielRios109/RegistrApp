import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomarSelfiePageRoutingModule } from './tomar-selfie-routing.module';

import { TomarSelfiePage } from './tomar-selfie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomarSelfiePageRoutingModule
  ],
  declarations: [TomarSelfiePage]
})
export class TomarSelfiePageModule {}
