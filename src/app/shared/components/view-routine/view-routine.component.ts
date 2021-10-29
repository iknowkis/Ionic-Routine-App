import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MainMyRoutinePage } from 'src/app/pages/my-routine/main-my-routine/main-my-routine.page';
import { ComposeRoutineComponent } from '../../../modals/compose-routine/compose-routine.component';
import { RoutineModel } from '../../models/item.model';
import { AlertService } from '../../services/alert/alert.service';
import { LocalNotificationService } from '../../services/local-notification/local-notification.service';
import { StorageService } from '../../services/storage/storage.service';
import { ThemeService } from '../../services/theme/theme.service';
import { getDayname, getTimerOn } from '../../util/data.util';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';

@Component({
  selector: 'app-view-routine',
  templateUrl: './view-routine.component.html',
  styleUrls: ['./view-routine.component.scss'],
})
export class ViewRoutineComponent {

  @Input() storageData: RoutineModel[];

  constructor(
    private router: Router,
    private theme: ThemeService,
    private alrtService: AlertService,
    private modalCtrl: ModalController,
    private navBar: MainNavbarComponent,
    private mainPage: MainMyRoutinePage,
    private storageService: StorageService,
    private notiService: LocalNotificationService,
  ) {
    this.theme.initTheme();
  }

  async openComposeRoutineModal(data) {
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
    
      this.notiService.getPending();
    });
    return modal.present();
  }

  async onReorder( { detail }: any) {
    await this.storageService.reorder(this.storageData, detail);
    this.mainPage.getStorageData();
    detail.complete(true);
  }

  async getStorageData() {
    this.storageData = await this.storageService.initStorageData();
  }

  deleteData(storageData: RoutineModel[], data: RoutineModel) {
    this.alrtService.deleteAlert(storageData, data).then(result => {
      if (result) this.navBar.getRoutineLength(storageData);
    })
  }

  // enterRoutine(data: RoutineModel) {
  //     // this.router.navigate(['../detail-routine',
  //     //   {title: data.routine.value.title, key: data.routine.key}]);
  // }

  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getDayName(data: RoutineModel) {
    return getDayname(data);
  }
}