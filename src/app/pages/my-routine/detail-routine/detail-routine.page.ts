import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ComposeTaskComponent } from '../../../modals/compose-task/compose-task.component';
import { RoutineModel, TaskType } from '../../../shared/models/item.model';
import { StorageService } from '../../../shared/services/storage/storage.service';

@Component({
  selector: 'app-detail-routine',
  templateUrl: './detail-routine.page.html',
  styleUrls: ['./detail-routine.page.scss'],
})
export class DetailRoutinePage {

  @Output() _routineKey: string;
  @Output() _taskList: TaskType[];
  @Output() _storageData: RoutineModel[];
  @Output() _selectedData: RoutineModel;

  routineTitle: string;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private modalController: ModalController,
  ) {
   }

  async openComposeTaskModal() {
    const modal = await this.modalController.create({
      component: ComposeTaskComponent,
      componentProps: {
        selectedData: this._selectedData,
      }
    });
    modal.onDidDismiss().then(async (item?:OverlayEventDetail) => {
      await this.getRoutineKey();
      // if(item.data) {
      //   this._taskList.push(await item.data.task[0])
      // }
      });
    return modal.present();
  }

  async ionViewWillEnter() {
    this._storageData = await this.storageService.initStorageData();
    this.getRoutineKey();
  }

  // Received from main-my-routine.page
  async getRoutineKey() {
    let routine = this.route.snapshot.params;
    this.routineTitle = await routine.title;
    this._routineKey = await routine.key;
    await this.getTaskList();
  }

  getTaskList() {
    this._selectedData = this._storageData.filter(e=>e.routine.key === this._routineKey)[0];
    this._taskList = this._selectedData.task === undefined ? [] : this._selectedData.task;
  }
}