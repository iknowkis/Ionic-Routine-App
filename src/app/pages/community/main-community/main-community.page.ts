import { Component, OnInit } from '@angular/core';
import { RoutineModel } from 'src/app/shared/models/item.model';
import { getRoutineDuration_util, getTimerOn } from 'src/app/shared/util/data.util';
import { Post } from '../../../shared/models/db.model';
import { DbcrudService } from '../../../shared/services/dbcrud/dbcrud.service';

@Component({
  selector: 'app-main-community',
  templateUrl: './main-community.page.html',
  styleUrls: ['./main-community.page.scss'],
})
export class MainCommunityPage implements OnInit {
  
  dbPosts: any;

  constructor(
    private dbService: DbcrudService,
    ) {
      this.getDbPosts();
    }
  ngOnInit() {
  }

  getDbPosts() { 
    this.dbService.getPosts().subscribe(post => {
      this.dbPosts = post.map((e: any) => {
          return {
            post_id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Post;
      });
    });
  }

  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getRoutineDuration(data: RoutineModel) {
    return getRoutineDuration_util(data);
  }
}