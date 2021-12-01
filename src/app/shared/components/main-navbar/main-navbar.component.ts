import { Component, OnInit } from '@angular/core';
import { RoutineModel } from '../../models/item.model';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss'],
})
export class MainNavbarComponent {

  storageData: RoutineModel[];

  myRoutineLength: number;

  constructor(
    private storageService: StorageService,
    ) {
      this.storageService.create();
      this.getStorageData().then(()=> this.getRoutineLength());
    }

  async getStorageData() {
    this.storageData = await this.storageService.initStorageData();
  }

  getRoutineLength(data?:RoutineModel[]) {
    if(data) {
      this.myRoutineLength = data.length
    }
    else this.myRoutineLength = this.storageData ? this.storageData.length : 0;
     
  }
}