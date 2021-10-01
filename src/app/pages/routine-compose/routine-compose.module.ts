import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutineComposePageRoutingModule } from './routine-compose-routing.module';

import { RoutineComposePage } from './routine-compose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutineComposePageRoutingModule
  ],
  declarations: [RoutineComposePage]
})
export class RoutineComposePageModule {}
