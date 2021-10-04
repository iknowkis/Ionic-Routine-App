import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailRoutinePageRoutingModule } from './detail-routine-routing.module';

import { DetailRoutinePage } from './detail-routine.page';
import { ViewTaskComponent } from 'src/app/shared/components/view-task/view-task.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailRoutinePageRoutingModule,
  ],
  declarations: [
    DetailRoutinePage,
    ViewTaskComponent,
  ]
})
export class DetailRoutinePageModule {}
