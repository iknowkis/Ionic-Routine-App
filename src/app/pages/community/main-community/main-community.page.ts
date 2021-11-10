import { Component, OnInit } from '@angular/core';
import { RoutineModel } from 'src/app/shared/models/item.model';
import { getTimerOn } from 'src/app/shared/util/data.util';
import { Board, Posts } from '../../../shared/models/db.model';
import { DbcrudService } from '../../../shared/services/dbcrud/dbcrud.service';

@Component({
  selector: 'app-main-community',
  templateUrl: './main-community.page.html',
  styleUrls: ['./main-community.page.scss'],
})
export class MainCommunityPage implements OnInit {
  peopleRoutineList = [`Armton's routine !`, `Paul's routine !`, `Joseph's routine !`]

  dbBoard: any;
  dbPosts: any;

  constructor(
    private dbService: DbcrudService,
    ) {
      this.getDbBoard();
      this.getDbPosts();
    }
  ngOnInit() {
  }

  getDbBoard() {
    this.dbService.getBoard().subscribe(board =>
      this.dbBoard = board.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Board;
      }));
  }
  getDbPosts() { 
    this.dbService.getPosts().subscribe(post => {
      this.dbPosts = post.map((e: any) => {
          return {
            post_id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Posts;
      });
    });
  }

  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getRoutineDuration(data: RoutineModel) {
    let sum = 0;
    data.task.map(e=> sum += e.value.duration);
    let hours = sum >= 60 ?  Math.floor(sum / 60) : 0;
    let minutes = sum % 60;
    return `${hours}h ${minutes}m`;
  }
}