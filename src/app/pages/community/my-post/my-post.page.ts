import { Component, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';
import { MainNavbarComponent } from 'src/app/shared/components/main-navbar/main-navbar.component';
import { Post } from 'src/app/shared/models/db.model';
import { DbcrudService } from 'src/app/shared/services/dbcrud/dbcrud.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { UtilService } from 'src/app/shared/services/util/util.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.page.html',
  styleUrls: ['./my-post.page.scss'],
})
export class MyPostPage {

  @Output() dbPosts: any;
  @Output() writer_name: string;
  editButton = '';

  constructor(
    private modalCtrl: ModalController,
    private navBar: MainNavbarComponent,

    private util: UtilService,
    private dbService: DbcrudService,
    private storageService: StorageService,
    ) {
      this.getDbPosts();
    }

  async openComposePostModal() {
    const modal = await this.modalCtrl.create({
      component: ComposePostComponent,
      // swipeToClose: true, // <-- Enable swipe to close only in iOS.
      // presentingElement: await this.modalCtrl.getTop()
    });
    modal.onDidDismiss().then(() => {
        this.navBar.getCommunityPostsLength();
    });
    return modal.present();
  }

  showEditButtone() {
    this.editButton = this.editButton == '' ? 'primary' : '';
  }

  getDbPosts() {
    this.storageService.getValue('auth').then(authValue=> {
      this.getWriterInfo(authValue.id);
      this.getPostData(authValue.id);
    });
  }
  getWriterInfo(id: string) {
    this.util.getWriterInfo(id).then(name => this.writer_name = name);
  }
  getPostData(id) {
    this.dbService.getPosts().subscribe(post => {
      this.util.getPostData(id).then(posts => this.dbPosts = posts);
    })
  }
}