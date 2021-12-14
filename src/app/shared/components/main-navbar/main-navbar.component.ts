import { Component } from '@angular/core';
import { RoutineModel } from '../../models/item.model';
import { DbcrudService } from '../../services/dbcrud/dbcrud.service';
import { StorageService } from '../../services/storage/storage.service';
import { UtilService } from '../../services/util/util.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss'],
})
export class MainNavbarComponent {

  storageData: RoutineModel[];
  myRoutineLength: number;
  communityPostsLength: number;

  constructor(
    private util: UtilService,
    private dbService: DbcrudService,
    private storageService: StorageService,
    ) {
      this.storageService.create();
      this.getStorageData().then(()=> this.getRoutineLength());
      this.getCommunityPostsLength();
    }

  async getStorageData() {
    this.storageData = await this.storageService.initStorageData();
  }
  
  getRoutineLength(receivedData?: RoutineModel[]) {
    let data = receivedData ? receivedData : this.storageData;
    if(data) {
    this.myRoutineLength = data.filter(routine =>
      routine.routine.value.statusValue.value == true).length;
    }
    else this.myRoutineLength = 0;
  }

  getCommunityPostsLength() {
    this.dbService.getPosts().subscribe(watch => {
      this.util.getPosts_length()
        .then(length => this.communityPostsLength = length);
    })
  }
}