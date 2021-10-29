import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-my-routine',
    pathMatch: 'full'
  },
  {
    path: 'main-my-routine',
    loadChildren: () => import('./main-my-routine/main-my-routine.module').then( m => m.MainMyRoutinePageModule)
  },
  {
    path: 'detail-routine',
    loadChildren: () => import('./detail-routine/detail-routine.module').then( m => m.DetailRoutinePageModule)
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
