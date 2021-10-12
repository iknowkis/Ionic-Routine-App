import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { RoutineModel, TaskType } from '../../shared/models/item.model';
import { StorageService } from '../../shared/services/storage/storage.service';
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
  _storageData: RoutineModel[];

  constructor(
    private data: RoutineModel,
    private modalCtrl: ModalController,
    private storageService: StorageService,
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
      }
    });
    return modal.present();
  }
  
  async saveTask() {
    this.storageService.saveData(this._storageData, this.selectedData, this.existedTask, this.task);
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}