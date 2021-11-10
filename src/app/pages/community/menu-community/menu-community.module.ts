import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCommunityPageRoutingModule } from './menu-community-routing.module';

import { MenuCommunityPage } from './menu-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCommunityPageRoutingModule
  ],
  // declarations: [MenuCommunityPage]
})
export class MenuCommunityPageModule {}
