import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuroPage } from './buro.page';

const routes: Routes = [
  {
    path: '',
    component: BuroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuroPageRoutingModule {}
