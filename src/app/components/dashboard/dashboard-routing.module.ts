import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new',
        loadChildren: () => import('../new/new.module').then( m => m.NewPageModule)
      },
      {
        path: 'all',
        loadChildren: () => import('../all/all.module').then( m => m.AllPageModule)
      },
      {
        path: 'overview',
        loadChildren: () => import('../overview/overview.module').then( m => m.OverviewPageModule)
      },
      {
        path: 'buro',
        loadChildren: () => import('../buro/buro.module').then( m => m.BuroPageModule)
      },
      {
        path: 'sheet',
        loadChildren: () => import('../sheet/sheet.module').then( m => m.SheetPageModule)
      },
    
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
