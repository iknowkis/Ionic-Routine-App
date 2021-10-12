import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-routine',
    pathMatch: 'full'
  },
  {
    path: 'my-routine',
    loadChildren: () => import('../my-routine/my-routine.module').then( m => m.MyRoutinePageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('../feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'community',
    loadChildren: () => import('../community/community.module').then( m => m.CommunityPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
