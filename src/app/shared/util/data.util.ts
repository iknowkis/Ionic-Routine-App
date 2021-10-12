import { RoutineModel, TaskType } from "../models/item.model";
import { WeekdayUtil } from "../models/weekday.model";


export function routineSort(data: RoutineModel[]) {
    if(data===null) return;
    data.sort((firstEl: any, nextEl: any) =>
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

export function deleteData(data: RoutineModel[], routine: RoutineModel, task?: TaskType) {
    if(task) {
        data.filter(e=> e === routine ? e.task.splice(e.task.indexOf(task), 1) : 0)
    }
    else data.splice(data.indexOf(routine), 1);
}