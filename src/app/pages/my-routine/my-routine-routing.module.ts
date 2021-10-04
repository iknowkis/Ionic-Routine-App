import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRoutinePage } from './my-routine.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'detail-routine',
    loadChildren: () => import('./detail-routine/detail-routine.module').then( m => m.DetailRoutinePageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main-my-routine/main-my-routine.module').then( m => m.MainMyRoutinePageModule)
  },
  {
    path: 'detail-task',
    loadChildren: () => import('./detail-task/detail-task.module').then( m => m.DetailTaskPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRoutinePageRoutingModule {}
