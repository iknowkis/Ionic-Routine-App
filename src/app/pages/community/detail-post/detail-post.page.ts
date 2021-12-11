import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../shared/models/db.model';
import { RoutineModel, SaveModel, TaskType } from '../../../shared/models/item.model';

import { getRoutineDuration_util, getTimerOff, getTimerOn } from '../../../shared/util/data.util';

import { DbcrudService } from '../../../shared/services/dbcrud/dbcrud.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { MainNavbarComponent } from '../../../shared/components/main-navbar/main-navbar.component';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { LocalNotificationService } from 'src/app/shared/services/local-notification/local-notification.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.page.html',
  styleUrls: ['./detail-post.page.scss'],
})
export class DetailPostPage implements OnInit {

  @Output() selected_post: any;
  @Output() writer_name: string;
  selected_post_id: string;
  taskList: TaskType[];

  constructor(
    private route: ActivatedRoute,
    private navBar: MainNavbarComponent,
    
    private dbService: DbcrudService,
    private alrtService: AlertService,
    private storageService: StorageService,
    private notiService: LocalNotificationService,
    ) { }

  ngOnInit() {
    this.getSelectedPostId();
  }

  async importIntoMyRoutine() {
    this.alrtService.importAlert().then(async result => {
      if (result) {
        this.selected_post.number_archived++;
        this.dbService.updatePost_LikeOrImport(this.selected_post_id, this.selected_post);
        
        let saveModel: SaveModel = {
          data: this.selected_post.data,
          storageData: [],
          existedData: undefined,
        }
        let storageData = await this.storageService.saveData(saveModel);
        this.notiService.set(storageData);

        this.navBar.getRoutineLength(storageData);
      }
    })
  }
  async likePost() {
    this.selected_post.number_liked++;
    this.dbService.updatePost_LikeOrImport(this.selected_post_id, this.selected_post);
  }

  async getSelectedPostId() {
    this.selected_post_id = await this.route.snapshot.params.post_id;
    
    this.dbService.getSelectedPost(this.selected_post_id).pipe(
      take(1)
      ).subscribe(data => {
        this.selected_post = data as Post;
        this.taskList = this.selected_post.data.task;

        this.dbService.getSelectedAccount(this.selected_post.writer_id).pipe(
          take(1)
          ).subscribe(account => {
            this.writer_name = account.name;
        });
    });
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