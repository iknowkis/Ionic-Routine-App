import { Component, OnInit } from '@angular/core';
import { RoutineModel } from '../../models/item.model';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss'],
})
export class MainNavbarComponent {

  storageData: Promise<RoutineModel[]>;

  myRoutineLength: number;

  constructor(
    private storageService: StorageService,
    ) {
      this.storageService.create();
      this.getRoutineLength();
    }

  async getRoutineLength() {
    this.storageData = this.storageService.initStorageData();
    if((await this.storageData) === null) this.myRoutineLength = 0;
    else this.myRoutineLength = (await this.storageData).length;
  }
}