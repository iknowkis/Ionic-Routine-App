import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ViewWirterInfoComponent } from './view-wirter-info.component';



@NgModule({
  declarations: [
    ViewWirterInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ViewWirterInfoComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ViewWriterInfoModule { }
