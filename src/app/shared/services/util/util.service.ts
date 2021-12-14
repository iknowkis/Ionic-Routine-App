import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';  

import { Account, Post } from '../../models/db.model';
import { deactivateData_util, deleteData } from '../../util/data.util';
import { RoutineModel, RoutineValueType, SaveModel, TaskType } from '../../models/item.model';

import { DbcrudService } from '../dbcrud/dbcrud.service';
import { StorageService } from '../storage/storage.service';
import { LocalNotificationService } from '../local-notification/local-notification.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  
  constructor(
    private dbService: DbcrudService,
    private storageService: StorageService,
    private notiService: LocalNotificationService,
    ) { }

  // Storage
  // Save routine or task
  async saveData(data: RoutineModel, existedData: RoutineModel|TaskType, routine?: RoutineValueType, task?: TaskType) {
    let saveModel: SaveModel = {
      data: data,
      existedData: existedData,
      routine: routine,
      task: task,
    }
    let savedData = await this.storageService.saveData(saveModel);
    this.notiService.set(savedData);
    return savedData;
  }

  // Deactivate
  deactivateData(storageData: RoutineModel[], isDeactivated: boolean) {
    storageData = deactivateData_util(storageData, isDeactivated);
    this.storageService.set('data', storageData);
    return storageData;
  }
  setDeactivatedData(isDeactivated: boolean) {
    isDeactivated = !isDeactivated;
    this.storageService.set('isDeactivated', {value: isDeactivated});
    return isDeactivated;
  }

  // Delete routine or task
  deleteStorageData(storageData: RoutineModel[], data: RoutineModel, task?: TaskType) {
    deleteData(storageData, data, task);
    this.storageService.set('data', storageData);
    this.notiService.set(storageData);
  }
  
  // DB
  // Get list of posts
  getPosts() {
    return new Promise(resolve => {
      this.dbService.getPosts().subscribe(list => {
        let posts = list.map((e: any) => {
            return {
              post_id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as Post;
        });
        posts.sort((a,b) => b.date - a.date);
        resolve(posts);
      });
    })
  }
  // Get list of posts by writer_id
  getPosts_Selected(id: string): Promise<object> {
    return new Promise(resolve => {
      this.dbService.getPosts().pipe(
        take(1)
        ).subscribe(post => {
        let posts = post.map((e: any) => {
          if(e.payload.doc.data().writer_id == id) {
            return {
              post_id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as Post;
          }
        }).filter(e=>e!=undefined);
        posts.sort((a,b) => b.date - a.date);
        resolve(posts);
      })
    })
  }
  // Get length of posts
  getPosts_length(): Promise<number> {
    return new Promise(resolve => {
      this.dbService.getPosts().pipe(
        take(1)
        ).subscribe(post => resolve(post.length));
    })
  }
  
  // Get detail of post by post_id
  getPost(id: string): Promise<any> {
    return new Promise(resolve => {
      this.dbService.getSelectedPost(id).pipe(
        take(1)
        ).subscribe(data => {
          let selected_post = data;
          let taskList = selected_post.data.task;
          
          this.getWriterInfo(selected_post.writer_id)
            .then(name => {
              let result = {
                selected_post: selected_post,
                taskList: taskList,
                writer_name: name,
              };
              resolve(result);
            })
      })
    })
  }
  // Get writer information
  getWriterInfo(id: string): Promise<string> {
    return new Promise(resolve => {
      this.dbService.getSelectedAccount(id).pipe(
        take(1)
        ).subscribe(account => {
          resolve(account.name);
      })
    })
  }

  // Get account
  getAccountWithId(account: Account): Promise<object> {
    let dbAccount: object;
    return new Promise(resolve => {
      this.dbService.getAccounts().pipe(
         take(1)
         ).subscribe((data:any) => {
          data.map(e=> {
            if(e.payload.doc.data().name == account.name) {
              dbAccount =  {
                id: e.payload.doc.id,
                ...e.payload.doc.data(),
              } as Account;
            }
          });
          resolve(dbAccount);
        })
    })
  }
}