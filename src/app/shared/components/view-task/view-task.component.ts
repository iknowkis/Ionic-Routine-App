import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposeTaskComponent } from '../../../modals/compose-task/compose-task.component';
import { DetailRoutinePage } from '../../../pages/my-routine/detail-routine/detail-routine.page';
import { RoutineModel, TaskType } from '../../models/item.model';
import { AlertService } from '../../services/alert/alert.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss'],
})
export class ViewTaskComponent {

  @Input() editActivate: boolean;
  @Input() storageData: RoutineModel[];
  @Input() selectedData: RoutineModel;
  @Input() taskList: TaskType[];

  constructor(
    private alrtService: AlertService,
    private modalCtrl: ModalController,
    private storageService: StorageService,
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

  deleteTask(task) {
    this.alrtService.deleteAlert(this.storageData, this.selectedData, task);
  }
}