import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RoutineModel, SaveModel, TaskType } from '../../models/item.model';
import { deleteData } from '../../util/data.util';
import { LocalNotificationService } from '../local-notification/local-notification.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alrtCtrl: AlertController,
    private storageService: StorageService,
    private notiService: LocalNotificationService,
  ) {
  }

  async reorderAlert(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alrtCtrl.create({
        header: `Sort by time`,
        message: `Do you really want to sort by time?`,
        buttons: [
          {
            text: 'Agree',
            handler: () => {
              this.storageService.remove('customSort');
              resolve(true);
            },
          },
          {
            text: 'Disagree',
            role: 'cancel',
            handler: _ => resolve(false),
          }
        ]
      });
      await alert.present();
    })
  }

  async deleteAlert(storageData: RoutineModel[], data: RoutineModel, task?: TaskType): Promise<boolean> {
    let target = task ? 'task' : 'routine';

    return new Promise(async (resolve, reject) => {
      const alert = await this.alrtCtrl.create({
        header: `Delete ${target}`,
        message: `Do you really want to delete this ${target}?`,
        buttons: [
          {
            text: 'Agree',
            handler: () => {
              this.deleteRoutine(storageData, data, task);
              resolve(true);
            },
          },
          {
            text: 'Disagree',
            role: 'cancel',
            handler: _ => resolve(false),
          }
        ]
      });
      await alert.present();
    })
  }

  deleteRoutine(storageData: RoutineModel[], data: RoutineModel, task?: TaskType) {
    // if (data.task != null) this.cancelNoti(data, task); ????
    deleteData(storageData, data, task);
    this.storageService.set('data', storageData);
    this.notiService.set(storageData);
  }

  async importAlert(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alrtCtrl.create({
        header: `Import routine`,
        message: `Do you want to import this routine into your routine list?`,
        buttons: [
          {
            text: 'Agree',
            handler: () => resolve(true),
          },
          {
            text: 'Disagree',
            role: 'cancel',
            handler: _ => resolve(false),
          }
        ]
      });
      await alert.present();
    })
  }

  // cancelNoti(data: RoutineModel, task?: TaskType) {
  //   let weekdayList = data.routine.value.weekday.map(day=> day);
  //   console.log('weekdayList', weekdayList);
  //   if (task) {
  //     console.log('changeStringToNumber(task.key', changeStringToNumber(task.key)); 
  //     this.notiService.cancel(changeStringToNumber(task.key));
  //     if(data.task.length == 1) {
  //       this.notiService.cancel(changeStringToNumber(data.routine.key));
  //     }
  //   }
  //   else {
  //     data.task.map(e => this.notiService.cancel(changeStringToNumber(e.key)));
  //     this.notiService.cancel(changeStringToNumber(data.routine.key));
  //   }
  // }
}