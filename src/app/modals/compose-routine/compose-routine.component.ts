import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoutineModel, RoutineUtil, RoutineValueType } from '../../shared/models/item.model';
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
  ) {
    this.data = RoutineModel.initRoutineModel(this.data);
    this.routine = this.data.routine.value;
  }

  ionViewWillEnter() {
    if(this.existedRoutine) this.data = this.existedRoutine;
    this.routine = this.data.routine.value;
  }

  async saveRoutine() {
    this.storageService.saveData(this.storageData, this.data, this.existedRoutine, null, this.routine);
    this.dismissModal();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}