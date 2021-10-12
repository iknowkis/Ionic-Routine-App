import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposeRoutineComponent } from 'src/app/modals/compose-routine/compose-routine.component';
import { RoutineModel } from '../../models/item.model';
import { WeekdayUtil } from '../../models/weekday.model';
import { AlertService } from '../../services/alert/alert.service';
import { StorageService } from '../../services/storage/storage.service';
import { ThemeService } from '../../services/theme/theme.service';
import { getDayname, getTimerHours, getTimerMinutes, getTimerOn } from '../../util/data.util';

@Component({
  selector: 'app-view-routine',
  templateUrl: './view-routine.component.html',
  styleUrls: ['./view-routine.component.scss'],
})
export class ViewRoutineComponent {

  @Input() storageData: RoutineModel[];
  @Input() editActivate :boolean;

  constructor(
    private theme: ThemeService,
    private alrtService: AlertService,
    private modalCtrl: ModalController,
    private storageService: StorageService,
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
    modal.onWillDismiss().then(async () => {
      this.storageData = await this.storageService.initStorageData();
    });
    return modal.present();
  }

  deleteData(storageData, data) {
    this.alrtService.deleteAlert(storageData, data);
  }

  getTimerOn(data) {
    return getTimerOn(data);
  }
  getDayName(data) {
    return getDayname(data);
  }
}