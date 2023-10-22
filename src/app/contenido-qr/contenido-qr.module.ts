import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContenidoQrPageRoutingModule } from './contenido-qr-routing.module';

import { ContenidoQrPage } from './contenido-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContenidoQrPageRoutingModule
  ],
  declarations: [ContenidoQrPage]
})
export class ContenidoQrPageModule {}
