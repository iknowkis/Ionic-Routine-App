import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainCommunityPageRoutingModule } from './main-community-routing.module';

import { MainCommunityPage } from './main-community.page';
import { MenuCommunityComponent } from 'src/app/shared/components/menu-community/menu-community.component';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';
import { ViewPostsComponent } from 'src/app/shared/components/view-posts/view-posts.component';

@NgModule({
  declarations: [
    MainCommunityPage,
    ComposePostComponent,
    
    MenuCommunityComponent,
    ViewPostsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainCommunityPageRoutingModule,
  ],
})
export class MainCommunityPageModule {}
