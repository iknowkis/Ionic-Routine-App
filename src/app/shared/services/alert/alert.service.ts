import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RoutineModel, TaskType } from '../../models/item.model';
import { DbcrudService } from '../dbcrud/dbcrud.service';
import { StorageService } from '../storage/storage.service';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dbService: DbcrudService,
    private alrtCtrl: AlertController,

    private util: UtilService,
    private storageService: StorageService,
  ) {
  }

  async reorderAlert(): Promise<boolean> {
    return new Promise(async resolve => {
      const alert = await this.alrtCtrl.create({
        header: `Sort by time`,
        message: `Do you really want to sort by time?`,
        buttons: [{
            text: 'Agree',
            handler: () => {
              this.storageService.remove('customSort');
              resolve(true);
            },
          }, {
            text: 'Disagree',
            role: 'cancel',
            handler: () => resolve(false),
          }]
      });
      await alert.present();
    })
  }

  async deleteStorageDataAlert(storageData: RoutineModel[], data: RoutineModel, task?: TaskType): Promise<boolean> {
    let target = task ? 'task' : 'routine';
    return new Promise(async resolve => {
      const alert = await this.alrtCtrl.create({
        header: `Delete ${target}`,
        message: `Do you really want to delete this ${target}?`,
        buttons: [{
            text: 'Agree',
            handler: () => {
              this.util.deleteStorageData(storageData, data, task);
              resolve(true);
            },
          }, {
            text: 'Disagree',
            role: 'cancel',
            handler: () => resolve(false),
          }]
      });
      await alert.present();
    })
  }

  async deletePostAlert(id: string): Promise<boolean> {
    return new Promise(async resolve => {
      const alert = await this.alrtCtrl.create({
        header: `Delete post`,
        message: `Do you really want to delete this post?`,
        buttons: [{
            text: 'Agree',
            handler: () => {
              this.dbService.deletePost(id);
              resolve(true);
            },
          }, {
            text: 'Disagree',
            role: 'cancel',
            handler: () => resolve(false),
          }]
      });
      await alert.present();
    })
  }

  async importAlert(): Promise<boolean> {
    return new Promise(async resolve => {
      const alert = await this.alrtCtrl.create({
        header: `Import routine`,
        message: `Do you want to import this routine into your routine list?`,
        buttons: [{
            text: 'Agree',
            handler: () => resolve(true),
          }, {
            text: 'Disagree',
            role: 'cancel',
            handler: () => resolve(false),
          }]
      });
      await alert.present();
    })
  }

  async deactivateAlert(storageData: RoutineModel[], isDeactivated: boolean): Promise<object[]> {
    let target = isDeactivated ? 'Activate' : 'Deactivate';
    return new Promise(async resolve => {
      const alert = await this.alrtCtrl.create({
        header: `${target} all of routine`,
        message: `Do you really want to ${target} all of routine?`,
        buttons: [{
            text: 'Agree',
            handler: () => resolve(this.util.deactivateData(storageData, isDeactivated)),
          }, {
            text: 'Disagree',
            role: 'cancel',
            handler: () => resolve(null),
          }]
      });
      await alert.present();
    })
  }
}