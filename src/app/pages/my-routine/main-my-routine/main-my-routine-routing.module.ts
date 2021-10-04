import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMyRoutinePage } from './main-my-routine.page';

const routes: Routes = [
  {
    path: '',
    component: MainMyRoutinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMyRoutinePageRoutingModule {}
