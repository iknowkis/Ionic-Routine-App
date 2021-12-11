import { Component, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainNavbarComponent } from '../../../shared/components/main-navbar/main-navbar.component';
import { ComposeRoutineComponent } from '../../../modals/compose-routine/compose-routine.component';
import { RoutineModel } from '../../../shared/models/item.model';

import { StorageService } from '../../../shared/services/storage/storage.service';
import { AlertService } from '../../../shared/services/alert/alert.service';


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

    private alrtService: AlertService,
    private storageService: StorageService,
  ) {
  }
  
  async openComposeRoutineModal() {
    const modal = await this.modalCtrl.create({
      component: ComposeRoutineComponent,
      // swipeToClose: true, // <-- Enable swipe to close only in iOS.
      // presentingElement: await this.modalCtrl.getTop()
    });
    modal.onDidDismiss().then(() => {
      this.getStorageData().then(()=>
        this.navBar.getRoutineLength(this._storageData));
    });
    return modal.present();
  }

  ionViewWillEnter() {
    this.getStorageData();
    this.CheckIsDeactivated();
  }
  async getStorageData() {
    this._storageData = await this.storageService.initStorageData();
    this.sortToggle = (await this.storageService.getValue('customSort')) != null ? true : false;
  }
  async CheckIsDeactivated() {
    this.isDeactivated = (await this.storageService.getValue('isDeactivated'))?.value;
  }

  // Deactivate
  deactivateAll() {
    this.alrtService.deactivateAlert(this._storageData, this.isDeactivated)
    .then(async result => {
      if(result) {
        this.deactivateData();
        this.afterDeactivateChangeSet();
        this.navBar.getRoutineLength(this._storageData);
      }
    })
  }
  deactivateData() {
    this._storageData = this._storageData.map(data=> {
      data.routine.value.statusValue = {
        name: this.isDeactivated  ? "Activate" : "Deactivate",
        value: this.isDeactivated
      }
      return data;
    });
  }
  afterDeactivateChangeSet() {
    this.isDeactivated = !this.isDeactivated;
    this.storageService.set('data', this._storageData);
    this.storageService.set('isDeactivated', {value: this.isDeactivated});
  }

  sortByTime() {
    this.alrtService.reorderAlert().then(async result => {
      if (result) {
        this.sortToggle = !this.sortToggle;
        await this.getStorageData();
      }
    });
  }

  showEditButtone() {
    this.editButton = this.editButton == '' ? 'primary' : '';
  }
}