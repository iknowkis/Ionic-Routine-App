import { Component, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { Post } from 'src/app/shared/models/db.model';
import { DbcrudService } from 'src/app/shared/services/dbcrud/dbcrud.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.page.html',
  styleUrls: ['./my-post.page.scss'],
})
export class MyPostPage {

  @Output() dbPosts: any;

  constructor(
    private dbService: DbcrudService,
    private storageService: StorageService,
    ) {
      this.getDbPosts();
    }

  getDbPosts() {
    this.storageService.getValue('auth').then(storageData=> {
    this.dbService.getPosts().subscribe(post => {
        this.dbPosts = post.map((e: any) => {
          if(e.payload.doc.data().writer_id == storageData.id)
            return {
              post_id: e.payload.doc.id,
              ...e.payload.doc.data(),
            } as Post;
        }).filter(e=>e!=undefined);
      });
    });
  }
}