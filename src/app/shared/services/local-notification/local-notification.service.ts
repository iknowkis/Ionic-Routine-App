import { Injectable } from '@angular/core';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications';

import { RoutineModel, TaskType } from '../../models/item.model';
import { changeStringToNumber } from '../../util/data.util';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(
    ) {
  }
  
  set(storageData: RoutineModel[]) {
    let notification: ILocalNotification;
    let array:ILocalNotification[];

    this.clear();
    storageData.map(data=> {
      let timerOn = Date.parse(data.routine.value.timerOn.toString())
      if(data.task!=undefined) {
        data.task.map((task, i)=> {

          // Check weekdayList
          data.routine.value.weekday.map(weekday=> {

            // Push into array, If statusValue is true
            if(data.routine.value.statusValue.value) {
              // Get time after previous task is finished
              notification = this.notificationSetting(timerOn, data, task, +weekday);
              array.push(notification)
              LocalNotifications.schedule(notification);

              // After pushing last task, push finishing notification
              if(i==data.task.length-1) {
                timerOn += task.value.duration * 1000 * 60;
                notification = this.notificationSetting(timerOn, data, task, +weekday, true);
                array.push(notification)
                LocalNotifications.schedule(notification);
              }
            }
          })

          // Add duration of task After set task
          timerOn += task.value.duration * 1000 * 60;
        })
      }
    })
    console.log(array);
    // LocalNotifications.schedule(array);
  }

  //  Finishing Notification
  notificationSetting(timerOn:number, data:RoutineModel, task:TaskType, weekday:number, isFinish?:boolean) {
      let notiTIme = new Date(timerOn);
      let id = changeStringToNumber(task.key);
      let finishId = changeStringToNumber(data.routine.key);

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
        sound: "beep.wav"
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