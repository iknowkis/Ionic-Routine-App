import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPostPageRoutingModule } from './detail-post-routing.module';

import { DetailPostPage } from './detail-post.page';
import { MainCommunityPageModule } from '../main-community/main-community.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPostPageRoutingModule,
  ],
  declarations: [
    DetailPostPage,
  ]
})
export class DetailPostPageModule {}
