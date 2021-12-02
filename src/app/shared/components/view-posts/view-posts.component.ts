import { Component, Input, OnInit } from '@angular/core';
import { RoutineModel } from '../../models/item.model';
import { getRoutineDuration_util, getTimerOn } from '../../util/data.util';


@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss'],
})
export class ViewPostsComponent implements OnInit {

  @Input() dbPosts: any;

  constructor(
    ) {
    }
  ngOnInit() {
  }

  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getRoutineDuration(data: RoutineModel) {
    return getRoutineDuration_util(data);
  }
}