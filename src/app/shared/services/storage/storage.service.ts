import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RoutineModel, RoutineValueType, TaskType } from '../../models/item.model';
import { routineSort } from '../../util/data.util';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageData: Promise<RoutineModel[]>;

  constructor(
    private storage: Storage,
  ) {
  }

  async initStorageData() {
    this.storageData = this.getValue('data');
    routineSort(await this.storageData)
    return this.storageData;
  }

  async saveData(storageData:RoutineModel[], data:RoutineModel, existedData:RoutineModel|TaskType, task?:TaskType, routine?:RoutineValueType) {
    storageData = await this.initStorageData();
    // When Edit
    if(existedData) {
      if(routine) {
        data.routine.value = routine;
      }
      this.editStorageData(storageData, data);
    }
    // When Add
    else {
      if(task) {
        data.task = data.task === undefined ? [] : data.task;
        data.task.push(task);
      }
      this.setStorageData(storageData, data);
    }
  }
  
  // Compose routine or task
  setStorageData(storageData: RoutineModel[], data: RoutineModel) {
    // When storageData is occupied
    if (storageData != null) {
      let routineisExisted: RoutineModel;
      storageData.map(e => {
        if(e.routine.key === data.routine.key) routineisExisted = e;
      });
      // Add task
      if(routineisExisted) {
        storageData.splice(storageData.indexOf(routineisExisted), 1, data);
      }
      // Add rotine
      else storageData.push(data);
      this.set('data', storageData);
    }
    // When storageData is vacant
    else {
      storageData = Array(data);
      this.set('data', storageData);
    }
  }

  // Edit routine or task
  editStorageData(storageData: RoutineModel[], data: RoutineModel) {
    storageData.map(e => {
      if(e.routine.key === data.routine.key) {
        storageData.splice(storageData.indexOf(e), 1, data);
      }
    });
    this.set('data', storageData);
  }

  async create() {
    await this.storage.create();
  }

  async set(key: string, value: object) {
    await this.storage?.remove(key);
    await this.storage?.set(key, value);
  }

  async getKeys() {
    await this.storage.keys();
  }

  async getValue(key: string) {
    return await this.storage.get(key);
  }

  async remove(key: string) {
    await this.storage.remove(key);
  }

  async clear() {
    await this.storage.clear();
  }
}