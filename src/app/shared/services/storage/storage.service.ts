import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RoutineModel } from '../../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageData: Promise<RoutineModel[]>;

  constructor(
    private storage: Storage,
  ) {
  }

  initStorageData() {
    this.storageData = this.getValue('data');
    return this.storageData;
  }

  async setStorageData(storage: RoutineModel[], value: RoutineModel) {
    if (storage != null) {
      (storage).push(value);
      this.set('data', storage);
    }
    else {
      storage = Array(value);
      this.set('data', storage);
    }
    // return storage;
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
    return this.storage.get(key); // .then(value => value);
  }

  async remove(key: string) {
    await this.storage.remove(key);
  }

  async clear() {
    await this.storage.clear();
  }
}