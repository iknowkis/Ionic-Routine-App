import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoutineModel, RoutineUtil } from 'src/app/shared/models/item.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-compose-routine',
  templateUrl: './compose-routine.component.html',
  styleUrls: ['./compose-routine.component.scss'],
})
export class ComposeRoutineComponent {

  _storageData: Promise<RoutineModel[]>;
  routine: any;

  constructor(
    public data: RoutineModel,
    public routineUtil: RoutineUtil,
    private modalCtrl: ModalController,
    private storageService: StorageService,
  ) {
    this.data = RoutineModel.initRoutineModel();
    this.routine = this.data.routine.value;

    this._storageData = storageService.initStorageData();
  }

  async saveRoutine() {
    await this.storageService.setStorageData(await this._storageData, this.data)
      // .then( savedData => this._storageData = savedData as any);
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}