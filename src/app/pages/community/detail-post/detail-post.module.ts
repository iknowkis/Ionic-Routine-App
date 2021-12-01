import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPostPageRoutingModule } from './detail-post-routing.module';

import { DetailPostPage } from './detail-post.page';
import { MainCommunityPageModule } from '../main-community/main-community.module';
import { ViewTaskModule } from 'src/app/shared/components/view-task/view-task.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPostPageRoutingModule,
    ViewTaskModule,
  ],
  declarations: [
    DetailPostPage,
  ]
})
export class DetailPostPageModule {}
