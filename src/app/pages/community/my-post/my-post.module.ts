import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPostPageRoutingModule } from './my-post-routing.module';

import { MyPostPage } from './my-post.page';
import { ViewPostsModule } from 'src/app/shared/components/view-posts/view-posts.module';

@NgModule({
  declarations: [
    MyPostPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPostPageRoutingModule,
    ViewPostsModule,
  ],
})
export class MyPostPageModule {}
