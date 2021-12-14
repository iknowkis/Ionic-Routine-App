export class Schedule {
    id: number;
    status: boolean;
    dayNumber: number;
    breakDuration: string;
    notifications: number[];
  }

export class LocalNotificationSettingModel {
  id: number;
  // status: boolean;
  text: string;
  dayNumber: number;
  trigger: {
    every: {
      weekday: number;
      hour: number;
      minute: number;
    };
  };
  data: {
    key: string;
    time: Date;
    timerOff: Date;
    workTime: number;
    breakTime: number;
    breakCount: number;
    status: boolean;
  };
  breakDuration: string;
  sound: string;
}