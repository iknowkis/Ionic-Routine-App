import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';
import { Post } from '../../models/db.model';
import { RoutineModel } from '../../models/item.model';
import { AlertService } from '../../services/alert/alert.service';
import { getRoutineDuration_util, getTimerOn } from '../../util/data.util';


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
      // swipeToClose: true, // <-- Enable swipe to close only in iOS.
      // presentingElement: await this.modalCtrl.getTop()
    });
    modal.onDidDismiss().then(() => {
        // this.navBar.getCommunityPostsLength();
    });
    return modal.present();
  }

  deletePost(id) {
    this.alrtService.deletePostAlert(id).then(result => {
      // if (result) this.navBar.getRoutineLength(storageData);
    })
  }

  getTimerOn(data: RoutineModel) {
    return getTimerOn(data);
  }
  getRoutineDuration(data: RoutineModel) {
    return getRoutineDuration_util(data);
  }
}