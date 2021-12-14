import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { initRoutineModel, RoutineModel, RoutineUtil, RoutineValueType } from '../../shared/models/item.model';

import { UtilService } from 'src/app/shared/services/util/util.service';

@Component({
  selector: 'app-compose-routine',
  templateUrl: './compose-routine.component.html',
  styleUrls: ['./compose-routine.component.scss'],
})
export class ComposeRoutineComponent {

  existedRoutine: RoutineModel;
  routine: RoutineValueType;

  constructor(
    private data: RoutineModel,
    public routineUtil: RoutineUtil,
    private modalCtrl: ModalController,

    private util: UtilService,
  ) {
    this.data = initRoutineModel();
    this.routine = this.data.routine.value;
  }

  ionViewWillEnter() {
    if(this.existedRoutine) this.data = this.existedRoutine;
    this.routine = this.data.routine.value;
  }

  saveRoutine() {
    this.util.saveData(this.data, this.existedRoutine, this.routine);
    this.dismissModal(true);
  }

  dismissModal(saved?: boolean) {
    this.modalCtrl.dismiss(saved);
  }
}