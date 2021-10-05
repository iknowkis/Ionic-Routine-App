import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRoutinePageRoutingModule } from './my-routine-routing.module';

import { MyRoutinePage } from './my-routine.page';
import { ComposeRoutineComponent } from '../../modals/compose-routine/compose-routine.component';
import { RoutineModel, RoutineUtil } from '../../shared/models/item.model';
import { ComposeTaskComponent } from 'src/app/modals/compose-task/compose-task.component';
import { IconsComponent } from 'src/app/modals/icons/icons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRoutinePageRoutingModule,
  ],
  entryComponents: [],
  declarations: [
    MyRoutinePage,
    ComposeRoutineComponent,
    ComposeTaskComponent,
    IconsComponent
  ],
  providers: [
    RoutineUtil,
    RoutineModel,
  ]
})
export class MyRoutinePageModule {}
