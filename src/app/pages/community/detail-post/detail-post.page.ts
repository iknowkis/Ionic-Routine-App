import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutineModel, TaskType } from '../../../shared/models/item.model';

import { getRoutineDuration_util, getTimerOff, getTimerOn } from '../../../shared/util/data.util';

import { DbcrudService } from '../../../shared/services/dbcrud/dbcrud.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { MainNavbarComponent } from '../../../shared/components/main-navbar/main-navbar.component';
import { UtilService } from 'src/app/shared/services/util/util.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.page.html',
  styleUrls: ['./detail-post.page.scss'],
})
export class DetailPostPage {

  @Output() selected_post: any;
  @Output() writer_name: string;
  @Output() taskList: TaskType[];
  post_id: string;

  constructor(
    private route: ActivatedRoute,
    private navBar: MainNavbarComponent,
    
    private util: UtilService,
    private toast: ToastService,
    private dbService: DbcrudService,
    private alrtService: AlertService,
    ) {
      this.getPostId()
        .then(id=> {
          this.post_id = id;
          this.getPost(id)
        });
    }
  getPostId(): Promise<string> {
    return new Promise(resolve => resolve(this.route.snapshot.params.post_id));
  }
  async getPost(id: string) {
    this.util.getPost(id).then(result => {
      this.selected_post = result.selected_post;
      this.taskList = result.taskList;
      this.writer_name = result.writer_name;
    });
  }

  async importIntoMyRoutine() {
    this.alrtService.importAlert().then(async result => {
      if (result) {
        this.selected_post.number_archived++;
        this.dbService.updatePost_LikeOrImport(this.post_id, this.selected_post);

        this.util.saveData(this.selected_post.data, null)
        .then(savedData => this.navBar.getRoutineLength(savedData));

        this.presentToast('Routine successfully imported.');
      }
    })
  }
  async likePost() {
    this.selected_post.number_liked++;
    this.dbService.updatePost_LikeOrImport(this.post_id, this.selected_post);
    
    this.presentToast('Post successfully liked.');
  }
  
  presentToast(str: string) {
    this.toast.presentToast(str, 'success');
  }

  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getTimerOff(data: RoutineModel) {
    return getTimerOff(data);
  }
  getRoutineDuration(data: RoutineModel) {
    return getRoutineDuration_util(data);
  }
}