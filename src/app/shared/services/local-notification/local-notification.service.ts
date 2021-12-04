import { Injectable } from '@angular/core';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';

import { RoutineModel, TaskType } from '../../models/item.model';
import { changeStringToNumber, getRandomNumber } from '../../util/data.util';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(
    ) {
  }
  
  set(storageData: RoutineModel[]) {
    let notification: ILocalNotification;
    let array: ILocalNotification[] = [];

    this.clear();
    storageData.map(data=> {
      if(data.routine.value.timerOn && data.routine.value.weekday) {
        let timerOn = Date.parse(data.routine.value.timerOn.toString())
        if(data.task) {
          data.task.map((task, i)=> {

            // Check weekdayList
            data.routine.value.weekday.map(weekday=> {

              // Push into array, If statusValue is true
              if(data.routine.value.statusValue.value) {
                // Get time after previous task is finished
                notification = this.notificationSetting(timerOn, data, task, +weekday);
                array.push(notification);

                // After pushing last task, push finishing notification
                if(i==data.task.length-1) {
                  timerOn += task.value.duration * 1000 * 60;
                  notification = this.notificationSetting(timerOn, data, task, +weekday, true);
                  array.push(notification);
                }
              }
            })

            // Add duration of task After set task
            timerOn += task.value.duration * 1000 * 60;
          });
        }
      }
    });
    LocalNotifications.schedule(array);
  }

  //  Finishing Notification
  notificationSetting(timerOn:number, data:RoutineModel, task:TaskType, weekday:number, isFinish?:boolean) {
      let notiTIme = new Date(timerOn);
      let id = changeStringToNumber(task.key) + weekday;
      let finishId = changeStringToNumber(data.routine.key) + weekday;
      let sound = data.routine.value.soundValue;
      let vibrate = data.routine.value.viberationValue;

      const notification: ILocalNotification = {
        id: isFinish ? finishId : id,
        title: data.routine.value.title + (isFinish ? ' is finished' : ''),
        text: task.value.title + (isFinish ? ' is finished' : ''),
        trigger: {
          every: {
            weekday: weekday,
            hour: notiTIme.getHours(),
            minute: notiTIme.getMinutes(),
          },
        },
        sound: sound == 'default' ? null : sound,
        vibrate: vibrate == 'true' ? true : false,
      }
      return notification
  }

  cancel(key: number) {
    LocalNotifications.cancel(key);
  }

  async clear() {
    await LocalNotifications.cancelAll();
  }

  async getPending() {
    let pending = await LocalNotifications.getAll();
    console.log('pending', pending);
  }
}