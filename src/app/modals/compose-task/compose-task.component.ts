import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { iconColorList, initTaskModel, RoutineModel, TaskType } from '../../shared/models/item.model';

import { IconsComponent } from '../icons/icons.component';
import { UtilService } from 'src/app/shared/services/util/util.service';

@Component({
  selector: 'app-compose-task',
  templateUrl: './compose-task.component.html',
  styleUrls: ['./compose-task.component.scss'],
})
export class ComposeTaskComponent {

  task: TaskType;
  existedTask: TaskType;
  selectedData: RoutineModel; // Received from detail-routine.page
  iconColorList = iconColorList;

  constructor(
    private modalCtrl: ModalController,

    private util: UtilService,
    ) {
      this.task = initTaskModel();
    }

  async openIconsModal() {
    const modal = await this.modalCtrl.create({
      component: IconsComponent,
    });
    modal.onDidDismiss().then((item?:OverlayEventDetail) => {
      if(item.data) {
        this.task.value.iconName = item.data[0].split(' ').join('-') as string;
        let iconColor = item.data[1]?.split('-')[2];
        this.task.value.iconColor = iconColor ? iconColor : 'medium';
      }
    });
    return modal.present();
  }
  
  async saveTask() {
    this.util.saveData(this.selectedData, this.existedTask, null, this.task);
    this.dismissModal(true);
  }

  dismissModal(saved?: boolean) {
    this.modalCtrl.dismiss(saved);
  }
}