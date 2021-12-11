import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RoutineModel, SaveModel, TaskType } from '../../models/item.model';
import { deleteData } from '../../util/data.util';
import { DbcrudService } from '../dbcrud/dbcrud.service';
import { LocalNotificationService } from '../local-notification/local-notification.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dbService: DbcrudService,
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

  async deleteStorageDataAlert(storageData: RoutineModel[], data: RoutineModel, task?: TaskType): Promise<boolean> {
    let target = task ? 'task' : 'routine';

    return new Promise(async (resolve, reject) => {
      const alert = await this.alrtCtrl.create({
        header: `Delete ${target}`,
        message: `Do you really want to delete this ${target}?`,
        buttons: [
          {
            text: 'Agree',
            handler: () => {
              this.deleteStorageData(storageData, data, task);
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

  deleteStorageData(storageData: RoutineModel[], data: RoutineModel, task?: TaskType) {
    // if (data.task != null) this.cancelNoti(data, task); ????
    deleteData(storageData, data, task);
    this.storageService.set('data', storageData);
    this.notiService.set(storageData);
  }

  async deletePostAlert(id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alrtCtrl.create({
        header: `Delete post`,
        message: `Do you really want to delete this post?`,
        buttons: [
          {
            text: 'Agree',
            handler: () => {
              this.delectePost(id);
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
  
  delectePost(id: string) {
    this.dbService.deletePost(id);
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

  async deactivateAlert(data: RoutineModel[], isDeactivated: boolean): Promise<boolean> {
    let target = isDeactivated ? 'Activate' : 'Deactivate';
    
    return new Promise(async (resolve, reject) => {
      const alert = await this.alrtCtrl.create({
        header: `${target} all of routine`,
        message: `Do you really want to ${target} all of routine?`,
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
}