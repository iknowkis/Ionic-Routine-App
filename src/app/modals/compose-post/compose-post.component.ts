import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from 'src/app/shared/models/db.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

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

    private auth: AuthService,
    private dbService: DbcrudService,
    private storageService: StorageService,
    ) {
    }

  ngOnInit() {
    this.getStorageData();
  }
  async getStorageData() {
    this.storageData = await this.storageService.initStorageData();
  }
  async savePost() {
    this.auth.getAuthValue().then(async (account: Account) => {
      this.dbService.addPost(this.postTitle, this.postContent, this.selectedRoutine, account.id);
    })
    this.dismissModal();
  }
  
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
