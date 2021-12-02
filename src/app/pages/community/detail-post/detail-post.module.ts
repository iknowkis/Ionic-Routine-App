import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPostPageRoutingModule } from './detail-post-routing.module';

import { DetailPostPage } from './detail-post.page';
import { ViewTaskModule } from 'src/app/shared/components/view-task/view-task.module';

@NgModule({
  declarations: [
    DetailPostPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPostPageRoutingModule,
    ViewTaskModule,
  ]
})
export class DetailPostPageModule {}
