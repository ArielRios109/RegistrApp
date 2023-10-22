import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContenidoQrPage } from './contenido-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ContenidoQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContenidoQrPageRoutingModule {}
