import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../../../shared/models/db.model';
import { RoutineModel, TaskType } from '../../../shared/models/item.model';

import { getTimerOn } from '../../../shared/util/data.util';

import { DbcrudService } from '../../../shared/services/dbcrud/dbcrud.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { MainNavbarComponent } from '../../../shared/components/main-navbar/main-navbar.component';
import { StorageService } from '../../../shared/services/storage/storage.service';

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
    private navBar: MainNavbarComponent,
    
    private dbService: DbcrudService,
    private alrtService: AlertService,
    private storageService: StorageService,
    ) { }

  ngOnInit() {
    this.getSelectedPostId();
  }

  async ionViewWillEnter() {
  }

  async importIntoMyRoutine() {
    this.alrtService.importAlert(this.selected_post.data).then(async result => {
      if (result) {
        this.selected_post.number_archived++;
        this.dbService.updatePost(this.selected_post_id, this.selected_post);
        let storageData = await this.storageService.initStorageData();
        this.navBar.getRoutineLength(storageData);
      }
    })
  }

  async likePost() {
    this.selected_post.number_liked++;
    this.dbService.updatePost(this.selected_post_id, this.selected_post);
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