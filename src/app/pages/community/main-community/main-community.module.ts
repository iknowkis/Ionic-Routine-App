import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainCommunityPageRoutingModule } from './main-community-routing.module';

import { MainCommunityPage } from './main-community.page';

@NgModule({
  declarations: [
    MainCommunityPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainCommunityPageRoutingModule,
  ],
  exports: [
    MainCommunityPage,
  ]
})
export class MainCommunityPageModule {}
