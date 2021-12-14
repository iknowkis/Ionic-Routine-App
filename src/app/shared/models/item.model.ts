import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { menuItemListModel } from "./db.model";
import { weekdayModel } from "./weekday.model";

@Injectable()
export class RoutineUtil {
    weekdays: string[] = weekdayModel;
    statusArray = statusArray;
}

export class SaveModel {
    storageData?: RoutineModel[];
    data: RoutineModel;
    existedData: RoutineModel|TaskType;
    routine?: RoutineValueType;
    task?: TaskType;
}

@Injectable()
export class RoutineModel {
    routine?: RoutineType;
    task?: TaskType[];
}

/**
 * Type of routine
 */
 export interface RoutineType {
    key?: string;
    value?: RoutineValueType;
}

export interface RoutineValueType {
    title?: string;
    timerOn?: Date;
    weekday?: Array<string>;
    soundValue?: string;
    viberationValue?: string;
    statusValue?: RoutineStatusType;
}

export interface RoutineStatusType {
    name?: string;
    value?: boolean;
}

/**
 * Type of task
 */
export interface TaskType {
    key?: string;
    value?: TaskValueType;
}

export interface TaskValueType {
    title?: string;
    duration?: number;
    iconName?: string;
    iconColor?: string;
}

/**
 * 
 */
export function initRoutineModel() {
    return {
        routine: {
            key: uuidv4(),
            value: {
                soundValue: 'beep.wav',
                viberationValue: 'true',
                statusValue: statusArray[0]
            }
        }
    }
}
export function initTaskModel() {
    return {
        key: uuidv4(),
        value: {
            iconName: 'happy-outline',
            iconColor: 'medium',
            duration: 0,
        }
    }
}

// export function getRandomNumber() {
//     return Math.floor(Math.random() * Math.pow(10, 8));
// }

export const statusArray  = [
    { name: 'Activate', value: true },
    { name: 'Deactivate', value: false }
  ];
  
  export const iconColorList  = [
    { value: 'tertiary', text: 'Purple' },
    { value: 'danger', text: 'Red' },
    { value: 'warning', text: 'Yellow' },
    { value: 'primary', text: 'Blue' },
    { value: 'medium', text: 'Gray' },
  ]

export const menuList: menuItemListModel[]  = [
    {
      icon_color: '', icon_name: 'chatbubbles-outline',
      label_color: '', label_text: 'Community',
      link: '../main-community'
    }, {
      icon_color: 'primary', icon_name: 'cube',
      label_color: 'primary', label_text: 'My post',
      link: '../my-post'
    }, {
      icon_color: '', icon_name: 'archive',
      label_color: '', label_text: 'Archived'
    }, {
      icon_color: '', icon_name: 'paper-plane',
      label_color: '', label_text: 'Message'
    },
    //  {
    //   icon_color: 'danger', icon_name: 'time-outline',
    //   label_color: 'danger', label_text: 'Recommend',
    //   link: '../account-info,{account_id: TfuUfxbXmqFITlhxcJQB}'
    // }, {
    //   icon_color: 'danger', icon_name: 'heart',
    //   label_color: 'danger', label_text: 'Followed'
    // },
  ];

// For compose icon
// 🙋‍♂️🚗🙏✌
export const iconList  = [
    {name: 'happy-outline', color: 'tertiary'},
    {name: 'rocket-outline', color: 'danger'},
    {name: 'thumbs-up-outline', color: 'warning'},
    {name: 'logo-whatsapp', color: 'primary'},

    {name: 'barbell-outline', color: 'tertiary'},
    {name: 'heart', color: 'danger'},
    {name: 'business-outline', color: 'warning'},
    {name: 'cube-outline', color: 'primary'},

    {name: 'hourglass-outline', color: 'tertiary'},
    {name: 'airplane', color: 'danger'},
    {name: 'hand-right-outline', color: 'warning'},
    {name: 'time-outline', color: 'primary'},
    
    {name: 'man-outline', color: 'tertiary'},
    {name: 'woman-outline', color: 'danger'},
    {name: 'body-outline', color: 'warning'},
    {name: 'accessibility-outline', color: 'primary'},
    
    {name: 'person-outline', color: 'tertiary'},
    {name: 'notifications-outline', color: 'danger'},
    {name: 'pie-chart-outline', color: 'warning'},
    {name: 'cloudy-outline', color: 'primary'},

    {name: 'reader-outline', color: 'tertiary'},
    {name: 'logo-youtube', color: 'danger'},
    {name: 'flash-outline', color: 'warning'},
    {name: 'alarm-outline', color: 'primary'},
  ];