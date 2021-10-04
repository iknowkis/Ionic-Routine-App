import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailRoutinePage } from './detail-routine.page';

const routes: Routes = [
  {
    path: '',
    component: DetailRoutinePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutinePageRoutingModule {}
