import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RoutineModel, RoutineValueType, SaveModel, TaskType } from '../../models/item.model';
import { routineSort } from '../../util/data.util';
import { DbcrudService } from '../dbcrud/dbcrud.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageData: Promise<RoutineModel[]>;

  constructor(
    private storage: Storage,
    private dbService: DbcrudService,
  ) {
  }

  async initStorageData(): Promise<RoutineModel[]> {
    this.storageData = await this.getValue('data');
    let reorderCheck = await this.getValue('customSort');
    if( reorderCheck == null ) routineSort(await this.storageData)
    return this.storageData;
  }

  async saveData(e:SaveModel): Promise<RoutineModel[]> {
    e.storageData = await this.initStorageData();
    // When Edit
    if(e.existedData) {
      if(e.routine) {
        e.data.routine.value = e.routine;
      }
      e.storageData = this.editStorageData(e.storageData, e.data);
    }
    // When Add
    else {
      if(e.task) {
        e.data.task = e.data.task === undefined ? [] : e.data.task;
        e.data.task.push(e.task);
      }
      e.storageData = this.setStorageData(e.storageData, e.data);
    }
    
    return e.storageData;
  }
  
  // Compose routine or task
  setStorageData(storageData: RoutineModel[], data: RoutineModel): RoutineModel[] {
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

    return storageData;
  }

  // Edit routine or task
  editStorageData(storageData: RoutineModel[], data: RoutineModel): RoutineModel[] {
    storageData.map(e => {
      if(e.routine.key === data.routine.key) {
        storageData.splice(storageData.indexOf(e), 1, data);
      }
    });
    this.set('data', storageData);

    return storageData;
  }

  async getDBId(datatest:string) {
    datatest = await this.getValue('dbid');
    if(datatest == null) {
      this.dbService.getBoard().subscribe(post =>{
        post.map(async (e: any) => {
          let data = e.payload.doc.data();
          console.log('data', data.name)
          if (data.name == 'Armton') datatest = await e.payload.doc.id;
        });
      });
      return await new Promise(async result => {
        console.log('re1', datatest)
        result(datatest)
      })
      // setTimeout(() => console.log('b', datatest), 100);
    }
  }

  async reorder(storageData: RoutineModel[], detail: any, taskList?: TaskType[]) {
    let list: RoutineModel[] | TaskType[];
    let data: RoutineModel | TaskType;
    let n: number;
    list = taskList ? taskList : storageData;
    data = list[detail.from];
    n = detail.from > detail.to ? 0 : 1;
    
    list.splice(detail.to + n, 0, data as any);
    list.splice(detail.from - n + 1, 1);

    if (taskList) {
      storageData.filter( (e,i) => {
        if(e.task == taskList)
          storageData[i].task = list as TaskType[];
      })
    }
    else (await this.set('customSort', {value: true}));
    
    taskList ? taskList = list as TaskType[] : storageData = list as RoutineModel[];
    await this.set('data', storageData);
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