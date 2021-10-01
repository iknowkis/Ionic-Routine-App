import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutineComposePage } from './routine-compose.page';

const routes: Routes = [
  {
    path: '',
    component: RoutineComposePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutineComposePageRoutingModule {}
