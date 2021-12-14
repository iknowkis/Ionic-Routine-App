import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTaskComponent } from './view-task.component';
import { RouterModule } from '@angular/router';
import { DetailRoutinePage } from 'src/app/pages/my-routine/detail-routine/detail-routine.page';



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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    DetailRoutinePage
  ]
})
export class ViewTaskModule { }
