import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RoutineModel, TaskType } from '../../models/item.model';
import { deleteData } from '../../util/data.util';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
      private alrtCtrl: AlertController,
      private storageService: StorageService,
    ) {
    }

  async deleteAlert(data: RoutineModel[], routine: RoutineModel, task?: TaskType) {
    let target: string;
    if(task) target = 'task';
    else target = 'routin';
    
    const alert = await this.alrtCtrl.create({
          header: `Delete ${target}`,
          message: `Do you really want to delete this ${target}?`,
          buttons: [
          {
              text: 'Agree',
              handler: () => this.deleteRoutine(data, routine, task)
          },
          {
              text: 'Disagree',
              role: 'cancel',
          }
          ]
      });
      await alert.present();
  }
  deleteRoutine(data:RoutineModel[], routine:RoutineModel, task?:TaskType) {
    deleteData(data, routine, task);
    this.storageService.set('data', data);
  }
}