import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityPage } from './community.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-community',
    pathMatch: 'full',
    component: CommunityPage
  },
  {
    path: 'main-community',
    loadChildren: () => import('./main-community/main-community.module').then( m => m.MainCommunityPageModule)
  },
  {
    path: 'detail-post',
    loadChildren: () => import('./detail-post/detail-post.module').then( m => m.DetailPostPageModule)
  },  {
    path: 'my-post',
    loadChildren: () => import('./my-post/my-post.module').then( m => m.MyPostPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPageRoutingModule {}
