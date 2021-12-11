import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';  
import { Post } from '../../models/db.model';
import { DbcrudService } from '../dbcrud/dbcrud.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  temp: any;
  
  constructor(
    private dbService: DbcrudService,
    private storageService: StorageService,
    ) { }
  
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
  getPostData(id: string): Promise<object> {
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
        resolve(posts);
      })
    })
  }
}