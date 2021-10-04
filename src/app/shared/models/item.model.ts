import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { statusArray } from "./schedule.model";
import { weekdayModel } from "./weekday.model";

@Injectable()
export class RoutineUtil {
    weekdays = weekdayModel;
    statusArray = statusArray;
}

@Injectable()
export class RoutineModel {
    routine?: RoutineType;
    task?: TaskType[];

    static initRoutineModel() {
        let data: RoutineModel;
        data = new RoutineModel;
        data = initRoutineData
        return data;
    }
    static initTaskModel() {
        let data: RoutineModel;
        data = new RoutineModel;
        data = initTaskData
        return data;
    }
}

export const initRoutineData = {
    routine: {
        key: uuidv4(),
        value: {
            soundValue: 'beep.wav',
            viberationValue: 'true',
            statusValue: statusArray[0]
        }
    }
};

export const initTaskData = {
    task: [{
        key: uuidv4(),
        value: {
            iconName: 'happy-outline',
            iconColor: 'medium',
        }
    }]
};
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
    weekdays?: Array<string>;
    weekday?: Array<string>;
    soundValue?: string;
    viberationValue?: string;
    statusArray?: RoutineStatusType[];
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