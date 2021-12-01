import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailRoutinePageRoutingModule } from './detail-routine-routing.module';

import { DetailRoutinePage } from './detail-routine.page';
import { ViewTaskModule } from '../../../shared/components/view-task/view-task.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailRoutinePageRoutingModule,
    ViewTaskModule,
  ],
  declarations: [
    DetailRoutinePage,
  ]
})
export class DetailRoutinePageModule {}
