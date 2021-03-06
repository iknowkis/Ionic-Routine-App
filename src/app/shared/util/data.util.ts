import { RoutineModel, TaskType } from "../models/item.model";
import { WeekdayUtil } from "../models/weekday.model";
import { v4 as uuidv4 } from 'uuid';
import { Account } from "../models/db.model";


export function routineSort(storageData: RoutineModel[]) {
    if(storageData===null) return;
    storageData.sort((firstEl: any, nextEl: any) =>
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

export function getTimerOn(data?: RoutineModel) {
    if(data===null) return;
    if(data.routine.value.timerOn===undefined) return;
    return `${getTimerHours(data)}:${getTimerMinutes(data) < 10 ? '0'+getTimerMinutes(data) : getTimerMinutes(data)}`;
}

export function getTimerOff(data: RoutineModel) {
    if(data.routine.value.timerOn===undefined) return;
    if(data.task===undefined) return;
    let timerOn = Date.parse(data.routine.value.timerOn.toString());
    data.task.map(task=> timerOn += task.value.duration * 1000 * 60);
    let timerOff = new Date(timerOn);
    return ` - ${timerOff.getHours()}:${timerOff.getMinutes() < 10 ? '0'+timerOff.getMinutes() : timerOff.getMinutes()}`;
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

export function changeStringToNumber(data: String) {
    return Number(data.replace(/[a-z\-]/g,'').slice(0,9))
}

export function getRoutineDuration_util(data: RoutineModel) {
    if(data.task===undefined) return '0m';
    let sum = 0;
    data.task.map(e=> sum += e.value.duration);
    let hours = sum >= 60 ? Math.floor(sum / 60) : 0;
    let minutes = sum % 60;
    return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function deactivateData_util(storageData: RoutineModel[], isDeactivated: boolean) {
    return storageData.map(data=> {
        data.routine.value.statusValue = {
          name: isDeactivated  ? "Activate" : "Deactivate",
          value: isDeactivated
        }
        return data;
      })
}

export function reorder_util(storageData: RoutineModel[], detail: any, taskList?: TaskType[]) {
    let list = taskList ? taskList : storageData;
    let data = list[detail.from];
    let n = detail.from > detail.to ? 0 : 1;
    list.splice(detail.to + n, 0, data as any);
    list.splice(detail.from - n + 1, 1);
    return list;
}

export function getSumOfLikes_util(data): number {
    let sum = 0;
    data.map(post=> sum = sum + post.number_liked);
    return sum;
}
export function getSumOfImport_util(data): number {
    let sum = 0;
    data.map(post=> sum = sum + post.number_archived);
    return sum;
}

export function initAccount_util(): Account {
  return {
    name: `User_${uuidv4().slice(0,4)}`,
    password: uuidv4().slice(0,8),
  }
}