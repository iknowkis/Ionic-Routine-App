import { RoutineModel, TaskType } from "../models/item.model";
import { WeekdayUtil } from "../models/weekday.model";


export function routineSort(storageData: RoutineModel[]) {
    if(storageData===null) return;
    storageData.sort((firstEl: any, nextEl: any) =>
      (getStatusValue(firstEl) - getStatusValue(nextEl)) ||
      (getTimerHours(firstEl) - getTimerHours(nextEl)) ||
      (getTimerMinutes(firstEl) - getTimerMinutes(nextEl)));
}

export function getDayname(data: RoutineModel) { 
    let arr = [];
    if(data.routine.value.weekday) {
      data.routine.value.weekday.map(e=> arr.push(WeekdayUtil.getDayName(+e).slice(0,3).toUpperCase()));
    }
    return arr.join(' ');
}

export function getTimerOn(data: RoutineModel) {
    if(data.routine.value.timerOn===undefined) return;
    return `${getTimerHours(data)} : ${getTimerMinutes(data)}`
}

export function getTimerHours(data: RoutineModel): number {
    return new Date(data.routine.value.timerOn).getHours();
}

export function getTimerMinutes(data: RoutineModel): number {
    return new Date(data.routine.value.timerOn).getMinutes();
}

export function getStatusValue(data: RoutineModel): number {
    return data.routine.value.statusValue.value ? 1 : 0;
}

export function deleteData(storageData: RoutineModel[], data: RoutineModel, task?: TaskType) {
    if(task) {
        storageData.filter(e=> e === data ? e.task.splice(e.task.indexOf(task), 1) : 0)
    }
    else storageData.splice(storageData.indexOf(data), 1);
}

export function getRandomNumber() {
    return Math.floor(Math.random() * Math.pow(10, 8));
}

export function changeStringToNumber(data: String) {
    return Number(data.replace(/[a-z\-]/g,'').slice(0,9))
}