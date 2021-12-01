import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMyRoutinePageRoutingModule } from './main-my-routine-routing.module';

import { MainMyRoutinePage } from './main-my-routine.page';
import { ViewRoutineComponent } from '../../../shared/components/view-routine/view-routine.component';
import { MainNavbarComponent } from 'src/app/shared/components/main-navbar/main-navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMyRoutinePageRoutingModule
  ],
  declarations: [
    MainMyRoutinePage,
    ViewRoutineComponent,
  ],
  providers: [
    MainNavbarComponent
  ]
})
export class MainMyRoutinePageModule {}
