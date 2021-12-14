import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';
import { RoutineModel } from '../../models/item.model';
import { getRoutineDuration_util, getTimerOff, getTimerOn } from '../../util/data.util';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';

import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss'],
})
export class ViewPostsComponent {

  @Input() editButton: boolean;
  @Input() dbPosts: any;

  constructor(
    private modalCtrl: ModalController,
    private navBar: MainNavbarComponent,

    private alrtService: AlertService,
    ) {
    }

  async openComposePostModal(data: any) {
    const modal = await this.modalCtrl.create({
      component: ComposePostComponent,
      componentProps: {
        post: data,
        post_id: data.post_id,
        postTitle: data.post_title,
        postContent: data.post_content,
        selectedRoutine: data.data,
      }
    });
    return modal.present();
  }
  
  deletePost(id: string) {
    this.alrtService.deletePostAlert(id).then(result => {
      if(result) console.log('deleted', id)
    })
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