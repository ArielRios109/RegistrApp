import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomarSelfiePage } from './tomar-selfie.page';

const routes: Routes = [
  {
    path: '',
    component: TomarSelfiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomarSelfiePageRoutingModule {}
