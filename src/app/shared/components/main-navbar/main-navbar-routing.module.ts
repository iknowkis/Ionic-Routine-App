import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavbarComponent } from './main-navbar.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainNavbarRoutingModule {}
