import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountInfoPageRoutingModule } from './account-info-routing.module';

import { AccountInfoPage } from './account-info.page';
import { ViewWriterInfoModule } from 'src/app/shared/components/view-wirter-info/view-writer-info.module';
import { ViewPostsModule } from 'src/app/shared/components/view-posts/view-posts.module';

@NgModule({
  declarations: [
    AccountInfoPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountInfoPageRoutingModule,
    ViewWriterInfoModule,
    ViewPostsModule,
  ],
})
export class AccountInfoPageModule {}
