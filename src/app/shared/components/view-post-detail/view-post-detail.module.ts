import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostDetailComponent } from './view-post-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ViewPostDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ViewPostDetailComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewPostDetailModule { }
