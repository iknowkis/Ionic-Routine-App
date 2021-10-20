import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposeTaskComponent } from '../../../modals/compose-task/compose-task.component';
import { DetailRoutinePage } from '../../../pages/my-routine/detail-routine/detail-routine.page';
import { RoutineModel, TaskType } from '../../models/item.model';
import { AlertService } from '../../services/alert/alert.service';
import { LocalNotificationService } from '../../services/local-notification/local-notification.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent {

  @Input() storageData: RoutineModel[];
  @Input() selectedData: RoutineModel;
  @Input() taskList: TaskType[];

  constructor(
    private alrtService: AlertService,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private notiService: LocalNotificationService,
    ) {
  }

  async openComposeTaskModal(task) {
    const modal = await this.modalCtrl.create({
      component: ComposeTaskComponent,
      componentProps: {
        task: await task,
        routineKey: this.selectedData.routine.key,
        selectedData: this.selectedData,
        existedTask: task,
      }
      // swipeToClose: true, // <-- Enable swipe to close only in iOS.
      // presentingElement: await this.modalCtrl.getTop()
    });
    modal.onDidDismiss().then(async () => {
      this.getTaskList();
    })
    return modal.present();
  }

  async getTaskList() {
    this.storageData = (await this.storageService.initStorageData())
    this.storageData.filter( e => {
      if(e.routine.key === this.selectedData.routine.key) {
        if(e.task !== this.taskList) {
          this.selectedData = e;
          this.taskList = e.task;
        }
      }
    });
  }
  
  async onReorder({ detail }: any) {

    let data = this.taskList[detail.from];
    let n = detail.from > detail.to ? 0 : 1;
    
    this.taskList.splice(detail.to + n, 0, data);
    this.taskList.splice(detail.from - n + 1, 1);
    this.taskList = this.taskList;

    this.storageData.filter( (e, i) => {
      if(e.routine.key === this.selectedData.routine.key) {
        this.storageData[i].task = this.taskList;
      }
    });
    await this.storageService.set('data', this.storageData);
    await this.notiService.set(this.storageData);
    detail.complete(true);
  }

  deleteTask(task) {
    this.alrtService.deleteAlert(this.storageData, this.selectedData, task);
  }
}