import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostsComponent } from './view-posts.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ViewPostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ViewPostsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewPostsModule { }
