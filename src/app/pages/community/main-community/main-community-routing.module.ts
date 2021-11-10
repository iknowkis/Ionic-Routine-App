import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainCommunityPage } from './main-community.page';

const routes: Routes = [
  {
    path: '',
    component: MainCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainCommunityPageRoutingModule {}
