import { Component, Input } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { DetailRoutinePage } from 'src/app/pages/my-routine/detail-routine/detail-routine.page';
import { ComposeTaskComponent } from '../../../modals/compose-task/compose-task.component';
import { RoutineModel, TaskType } from '../../models/item.model';
import { getDayname, getRoutineDuration_util, getTimerOff, getTimerOn } from '../../util/data.util';

import { AlertService } from '../../services/alert/alert.service';
import { LocalNotificationService } from '../../services/local-notification/local-notification.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent {

  @Input() editButton: boolean;
  @Input() storageData: RoutineModel[];
  @Input() selectedData: RoutineModel;
  @Input() taskList: TaskType[];
  @Input() routineTitle: string;

  constructor(
    private modalCtrl: ModalController,
    private detail_routine: DetailRoutinePage,

    private alrtService: AlertService,
    private storageService: StorageService,
    private notiService: LocalNotificationService,
    ) {
  }

  async openComposeTaskModal(task: TaskType) {
    const modal = await this.modalCtrl.create({
      component: ComposeTaskComponent,
      componentProps: {
        task: task,
        routineKey: this.selectedData.routine.key,
        selectedData: this.selectedData,
        existedTask: task,
      }
    });
    modal.onDidDismiss().then(()=> {
      this.detail_routine.initData();
    })
    return modal.present();
  }

  async onReorder({ detail }: any) {
    await this.storageService.reorder(this.storageData, detail, this.taskList);
    this.notiService.set(this.storageData);
    detail.complete(true);
  }
  
  deleteTask(task: TaskType) {
    this.alrtService.deleteStorageDataAlert(this.storageData, this.selectedData, task);
  }

  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getTimerOff(data: RoutineModel) {
    return getTimerOff(data);
  }
  getRoutineDuration(data: RoutineModel) {
    return getRoutineDuration_util(data);
  }
  getDayName(data: RoutineModel) {
    return getDayname(data);
  }
}