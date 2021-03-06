import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPostPageRoutingModule } from './my-post-routing.module';

import { MyPostPage } from './my-post.page';
import { ViewPostsModule } from 'src/app/shared/components/view-posts/view-posts.module';
import { ViewWirterInfoComponent } from 'src/app/shared/components/view-wirter-info/view-wirter-info.component';
import { ViewWriterInfoModule } from 'src/app/shared/components/view-wirter-info/view-writer-info.module';

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
    ViewWriterInfoModule,
  ],
})
export class MyPostPageModule {}
