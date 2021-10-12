import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MyRoutinePageRoutingModule } from './my-routine-routing.module';
import { MyRoutinePage } from './my-routine.page';
import { RoutineModel, RoutineUtil } from '../../shared/models/item.model';

import { ComposeRoutineComponent } from '../../modals/compose-routine/compose-routine.component';
import { ComposeTaskComponent } from '../../modals/compose-task/compose-task.component';
import { IconsComponent } from '../../modals/icons/icons.component';

@NgModule({
  declarations: [
    MyRoutinePage,
    ComposeRoutineComponent,
    ComposeTaskComponent,
    IconsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRoutinePageRoutingModule,
  ],
  entryComponents: [],
  providers: [
    RoutineUtil,
    RoutineModel,
  ]
})
export class MyRoutinePageModule {}
