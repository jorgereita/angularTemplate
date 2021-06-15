import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialFormComponent } from '../../components/forms/initial-form/initial-form.component';
import { NewPage } from './new.page';

const routes: Routes = [
  {
    path: '',
    component: NewPage,
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPageRoutingModule {}
