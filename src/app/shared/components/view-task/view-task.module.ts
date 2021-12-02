import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTaskComponent } from './view-task.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ViewTaskComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ViewTaskComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewTaskModule { }
