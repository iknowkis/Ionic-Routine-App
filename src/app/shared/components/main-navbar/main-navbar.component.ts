import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { RoutineModel } from '../../models/item.model';
import { DbcrudService } from '../../services/dbcrud/dbcrud.service';
import { StorageService } from '../../services/storage/storage.service';

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
    private dbService: DbcrudService,
    private storageService: StorageService,
    ) {
      this.storageService.create();
      this.getStorageData().then(()=> {
        this.getRoutineLength();
      });
      this.getCommunityPostsLength();
    }

  async getStorageData() {
    this.storageData = await this.storageService.initStorageData();
  }
  getRoutineLength(data?: RoutineModel[]) {
    if(data) {
      this.myRoutineLength = data.length;
    }
    else this.myRoutineLength = this.storageData ? this.storageData.length : 0;
  }

  getCommunityPostsLength() {
    this.getDbPosts().then(e=> this.communityPostsLength = e as number);
  }
  getDbPosts() {
    let el: number;
    return new Promise(resolve => {
      this.dbService.getPosts().pipe(
        take(1)
        ).subscribe(post => {
          el = post.length;
          resolve(el)
        });
    })
  }
}