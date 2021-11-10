import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCommunityPage } from './menu-community.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCommunityPageRoutingModule {}
