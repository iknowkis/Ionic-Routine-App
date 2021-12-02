import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostDetailComponent } from './view-post-detail.component';



@NgModule({
  declarations: [
    ViewPostDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ViewPostDetailComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewPostDetailModule { }
