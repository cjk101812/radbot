import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './radmin/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  {
    path: 'overlay', loadChildren: () => import('./overlay/overlay.module').then(m => m.OverlayModule)
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
