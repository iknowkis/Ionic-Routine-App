import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { statusArray } from "./schedule.model";
import { weekdayModel } from "./weekday.model";

export class SaveModel {
    storageData:RoutineModel[];
    data:RoutineModel;
    existedData:RoutineModel|TaskType;
    routine?:RoutineValueType;
    task?:TaskType;
}

@Injectable()
export class RoutineUtil {
    weekdays = weekdayModel;
    statusArray = statusArray;
}

@Injectable()
export class RoutineModel {
    routine?: RoutineType;
    task?: TaskType[];

    static initRoutineModel(data: RoutineModel) {
        data = {
            routine: {
                key: uuidv4(),
                value: {
                    soundValue: 'beep.wav',
                    viberationValue: 'true',
                    statusValue: statusArray[0]
                }
            }
        }
        return data;
    }
    
    static initTaskModel(data: RoutineModel) {
        data.task = [{
            key: uuidv4(),
            value: {
                iconName: 'happy-outline',
                iconColor: 'medium',
                duration: 0,
            }
        }]
        
        return data;
    }
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