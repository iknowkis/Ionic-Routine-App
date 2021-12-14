import { Component, Output } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { MainNavbarComponent } from '../../../shared/components/main-navbar/main-navbar.component';
import { ComposeRoutineComponent } from '../../../modals/compose-routine/compose-routine.component';
import { RoutineModel } from '../../../shared/models/item.model';

import { StorageService } from '../../../shared/services/storage/storage.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { UtilService } from 'src/app/shared/services/util/util.service';

@Component({
  selector: 'app-main-my-routine',
  templateUrl: './main-my-routine.page.html',
  styleUrls: ['./main-my-routine.page.scss'],
})
export class MainMyRoutinePage {

  @Output() _storageData: RoutineModel[];
  editButton = '';
  sortToggle = false;
  isDeactivated = false;

  constructor(
    private modalCtrl: ModalController,
    private navBar: MainNavbarComponent,

    private util: UtilService,
    private alrtService: AlertService,
    private storageService: StorageService,
  ) {
  }
  
  async openComposeRoutineModal() {
    const modal = await this.modalCtrl.create({
      component: ComposeRoutineComponent,
    });
    modal.onDidDismiss().then((saved: OverlayEventDetail) => {
      if(saved.data) {
        this.getStorageData()
          .then(()=> this.navBar.getRoutineLength(this._storageData));
      }
    });
    return modal.present();
  }

  ionViewWillEnter() {
    this.getStorageData();
    this.CheckIsDeactivated();
  }
  async getStorageData() {
    this._storageData = await this.storageService.initStorageData();
    this.sortToggle = (await this.storageService.getValue('customSort')) ? true : false;
  }
  async CheckIsDeactivated() {
    this.isDeactivated = (await this.storageService.getValue('isDeactivated'))?.value;
  }

  // Deactivate button
  deactivateAll() {
    this.alrtService.deactivateAlert(this._storageData, this.isDeactivated)
    .then(async deactivatedData => {
      if(deactivatedData) {
        this._storageData = deactivatedData;
        this.isDeactivated = this.util.setDeactivatedData(this.isDeactivated);
        this.navBar.getRoutineLength(this._storageData);
      }
    })
  }

  sortByTime() {
    this.alrtService.reorderAlert().then(result => {
      if (result) {
        this.sortToggle = !this.sortToggle;
        this.getStorageData();
      }
    });
  }

  showEditButtone() {
    this.editButton = this.editButton == '' ? 'primary' : '';
  }
}