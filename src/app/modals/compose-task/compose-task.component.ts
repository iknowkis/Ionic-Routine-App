import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { RoutineModel, SaveModel, TaskType } from '../../shared/models/item.model';

import { StorageService } from '../../shared/services/storage/storage.service';
import { LocalNotificationService } from '../../shared/services/local-notification/local-notification.service';

import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-compose-task',
  templateUrl: './compose-task.component.html',
  styleUrls: ['./compose-task.component.scss'],
})
export class ComposeTaskComponent {

  task: TaskType;
  existedTask: TaskType;
  selectedData: RoutineModel; // Received from detail-routine.page
  storageData: RoutineModel[];
  // taskIcon: string;

  constructor(
    private data: RoutineModel,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private notiService: LocalNotificationService,
    ) {
      this.data = RoutineModel.initTaskModel(this.data);
      this.task = this.data.task[0];
    }

  async openIconsModal() {
    const modal = await this.modalCtrl.create({
      component: IconsComponent,
    });
    modal.onDidDismiss().then((item?:OverlayEventDetail) => {
      if(item.data) {
        this.task.value.iconName = item.data[0].split(' ').join('-') as string;
        this.task.value.iconColor = item.data[1]?.split('-')[2]
        // this.taskIcon = item.data;
      }
    });
    return modal.present();
  }
  
  async saveTask() {
    let saveModel:SaveModel = {
      storageData: this.storageData,
      data: this.selectedData,
      existedData: this.existedTask,
      task: this.task,
    }
    this.storageData = await this.storageService.saveData(saveModel);
    this.notiService.set(this.storageData);
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}