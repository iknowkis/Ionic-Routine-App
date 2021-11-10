import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { RoutineModel } from '../../shared/models/item.model';

import { DbcrudService } from '../../shared/services/dbcrud/dbcrud.service';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-compose-post',
  templateUrl: './compose-post.component.html',
  styleUrls: ['./compose-post.component.scss'],
})
export class ComposePostComponent implements OnInit {

  postTitle: any;
  postContent: any;
  storageData: RoutineModel[];
  selectedRoutine: any;

  constructor(
    private modalCtrl: ModalController,

    private storageService: StorageService,

    private dbService: DbcrudService,
    ) {
    }

  ngOnInit() {
    this.getStorageData();
  }
  async getStorageData() {
    this.storageData = await this.storageService.initStorageData();
  }
  async savePost() {
    this.dbService.addPost(this.postTitle, this.postContent, this.selectedRoutine);
    this.dismissModal();
  }
  
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
