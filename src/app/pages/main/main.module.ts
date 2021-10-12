import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';

import { MainNavbarComponent } from '../../shared/components/main-navbar/main-navbar.component';

@NgModule({
  declarations: [
    MainPage,
    MainNavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
  ],
  exports: [MainPage],
})
export class MainPageModule {}
