export const statusArray  = [
  { name: 'Activate', value: true },
  { name: 'Deactivate', value: false }
];

export class Schedule {
    id: number;
    status: boolean;
    dayNumber: number;
    breakDuration: string;
    notifications: number[];
  }

export class LocalNotificationSettingModel {
  id: number;
  text: string;
  // status: boolean;
  dayNumber: number;
  trigger: {
    // count: number;
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