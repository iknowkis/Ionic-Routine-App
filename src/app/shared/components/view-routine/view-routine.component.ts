import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ComposeRoutineComponent } from '../../../modals/compose-routine/compose-routine.component';
import { MainMyRoutinePage } from '../../../pages/my-routine/main-my-routine/main-my-routine.page';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';
import { getDayname, getRoutineDuration_util, getTimerOn } from '../../util/data.util';
import { RoutineModel } from '../../models/item.model';


import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { AlertService } from '../../services/alert/alert.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-view-routine',
  templateUrl: './view-routine.component.html',
  styleUrls: ['./view-routine.component.scss'],
})
export class ViewRoutineComponent {

  @Input() editButton: boolean;
  @Input() storageData: RoutineModel[];
  
  constructor(
    public firestore: AngularFirestore,

    private modalCtrl: ModalController,
    private navBar: MainNavbarComponent,
    private mainPage: MainMyRoutinePage,

    private auth: AuthService,
    private theme: ThemeService,
    private alrtService: AlertService,
    private storageService: StorageService,
  ) {
    this.theme.initTheme();
    this.auth.initAuth();
  }
  
  openNewComposeRoutineModal() {
    this.mainPage.openComposeRoutineModal();
  }

  async openComposeRoutineModal(data: RoutineModel) {
    const modal = await this.modalCtrl.create({
      component: ComposeRoutineComponent,
      componentProps: {
        routine: data.routine.value,
        existedRoutine: data,
      }
      // swipeToClose: true, // <-- Enable swipe to close only in iOS.
      // presentingElement: await this.modalCtrl.getTop()
    });
    modal.onDidDismiss().then(() => {
      this.getStorageData();
      this.navBar.getRoutineLength(this.storageData);
    });
    return modal.present();
  }

  async getStorageData() {
    this.storageData = await this.storageService.initStorageData();
  }
  deleteData(storageData: RoutineModel[], data: RoutineModel) {
    this.alrtService.deleteStorageDataAlert(storageData, data).then(result => {
      if (result) this.navBar.getRoutineLength(storageData);
    })
  }

  deactivatedIonCard(data) {
    return data.routine.value.statusValue.value ? '' : 'deactivatedIonCard';
  }
  async onReorder( { detail }: any) {
    await this.storageService.reorder(this.storageData, detail);
    this.mainPage.getStorageData();
    detail.complete(true);
  }

  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getDayName(data: RoutineModel) {
    return getDayname(data);
  }
  getRoutineDuration(data: RoutineModel) {
    return getRoutineDuration_util(data);
  }
}