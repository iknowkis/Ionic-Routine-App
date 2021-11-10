import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from 'src/app/shared/models/db.model';
import { RoutineModel, TaskType } from 'src/app/shared/models/item.model';
import { DbcrudService } from 'src/app/shared/services/dbcrud/dbcrud.service';
import { getTimerOn } from 'src/app/shared/util/data.util';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.page.html',
  styleUrls: ['./detail-post.page.scss'],
})
export class DetailPostPage implements OnInit {

  selected_post_id: string;
  selected_post: any;
  taskList: TaskType[];

  constructor(
    private route: ActivatedRoute,
    private dbService: DbcrudService,
    ) { }

  ngOnInit() {
    this.getSelectedPostId();
  }

  async ionViewWillEnter() {
  }

  async getSelectedPostId() {
    let data = this.route.snapshot.params;
    this.selected_post_id = await data.post_id;
    // await this.getTaskList();
    
    this.dbService.getSelectedPost(this.selected_post_id).subscribe(data => {
      this.selected_post = data as Posts;
      this.taskList = this.selected_post.data.task;
    });
  }
  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getRoutineDuration(data: RoutineModel) {
    let sum = 0;
    data.task.map(e=> sum += e.value.duration);
    let hours = sum >= 60 ? Math.floor(sum / 60) : 0;
    let minutes = sum % 60;
    return `${hours}h ${minutes}m`;
  }
}