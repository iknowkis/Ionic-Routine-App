import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { ComposeTaskComponent } from '../../../modals/compose-task/compose-task.component';
import { RoutineModel, TaskType } from '../../../shared/models/item.model';
import { StorageService } from '../../../shared/services/storage/storage.service';

@Component({
  selector: 'app-detail-routine',
  templateUrl: './detail-routine.page.html',
  styleUrls: ['./detail-routine.page.scss'],
})
export class DetailRoutinePage {

  @Output() _routineKey: string; // Received from main-my-routine.page
  @Output() _taskList: TaskType[];
  @Output() _storageData: RoutineModel[];
  @Output() _selectedData: RoutineModel;
  editButton = '';

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private modalController: ModalController,
  ) {
   }

   ionViewWillEnter() {
    this.initData();
  }

  async openComposeTaskModal() {
    const modal = await this.modalController.create({
      component: ComposeTaskComponent,
      componentProps: {
        selectedData: this._selectedData,
      }
    });
    modal.onDidDismiss().then((saved: OverlayEventDetail) => {
      if(saved.data) this.initData();
    });
    return modal.present();
  }

  initData() {
    this.getStorageData()
      .then(()=> this.getRoutineKey()
        .then(()=> this.getTaskList()));
  }
  async getStorageData() {
    this._storageData = await this.storageService.initStorageData();
  }
  async getRoutineKey() {
    let routine = this.route.snapshot.params;
    this._routineKey = await routine.key;
    this.getTaskList();
  }
  getTaskList() {
    this._selectedData = this._storageData
      .filter(e=>e.routine.key === this._routineKey)[0];
    this._taskList = this._selectedData.task ? this._selectedData.task : [];
  }

  showEditButtone() {
    this.editButton = this.editButton == '' ? 'primary' : '';
  }
}