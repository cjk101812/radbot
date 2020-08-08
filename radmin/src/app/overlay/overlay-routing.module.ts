import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverlayComponent } from './overlay.component';

const routes: Routes = [
  { path: 'overlay', component: OverlayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverlayRoutingModule { }