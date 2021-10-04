import { Injectable } from '@angular/core';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';
import { LocalNotificationSettingModel } from '../../models/schedule.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {


  constructor(
    public storageService: StorageService,
    public notiModel: LocalNotificationSettingModel
    ) {
  }
  
  async set(value: ILocalNotification) {
    let notificationSetting: ILocalNotification;
    notificationSetting ={
      id: value.id,
    }
  }

  async cancel(key) {
    await this.storageService.getValue(key).then(async list => {
      const cancelOptions = { notifications: list };
      await LocalNotifications.cancel(cancelOptions);
    });
    await this.storageService.remove(key);
  }

  async clear() {
    await LocalNotifications.cancelAll
  }

  async getPending() {
    let pending = await LocalNotifications.getAll();
    console.log('pending', pending);
  }
}