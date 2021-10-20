import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalNotificationService } from 'src/app/shared/services/local-notification/local-notification.service';
import { RoutineModel, RoutineUtil, RoutineValueType, SaveModel } from '../../shared/models/item.model';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-compose-routine',
  templateUrl: './compose-routine.component.html',
  styleUrls: ['./compose-routine.component.scss'],
})
export class ComposeRoutineComponent {

  storageData: RoutineModel[];
  existedRoutine: RoutineModel;
  routine: RoutineValueType;

  constructor(
    public routineUtil: RoutineUtil,
    private data: RoutineModel,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private notiService: LocalNotificationService,
  ) {
    this.data = RoutineModel.initRoutineModel(this.data);
    this.routine = this.data.routine.value;
  }

  ionViewWillEnter() {
    if(this.existedRoutine) this.data = this.existedRoutine;
    this.routine = this.data.routine.value;
  }

  async saveRoutine() {
    let saveModel:SaveModel = {
      storageData: this.storageData,
      data: this.data,
      existedData: this.existedRoutine,
      routine: this.routine,
    }
    this.storageData = await this.storageService.saveData(saveModel);
    this.notiService.set(this.storageData);
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}