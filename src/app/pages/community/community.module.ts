import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunityPageRoutingModule } from './community-routing.module';

import { CommunityPage } from './community.page';
import { MenuCommunityPage } from './menu-community/menu-community.page';
import { ComposePostComponent } from '../../modals/compose-post/compose-post.component';
import { MainCommunityPageModule } from './main-community/main-community.module';

@NgModule({
  declarations: [
    CommunityPage,

    ComposePostComponent,
    MenuCommunityPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunityPageRoutingModule,
    MainCommunityPageModule,
  ]
})
export class CommunityPageModule {}