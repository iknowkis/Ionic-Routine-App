import { Component, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';
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

    private util: UtilService,
    private dbService: DbcrudService,
    private storageService: StorageService,
    ) {
      this.getDbPosts();
    }

    getDbPosts() {
      this.storageService.getValue('auth')
        .then(authValue=> {
          this.getWriterInfo(authValue.id);
          this.getPostsData(authValue.id);
      });
    }
    getWriterInfo(id: string) {
      this.util.getWriterInfo(id).then(name => this.writer_name = name);
    }
    getPostsData(id) {
      this.dbService.getPosts().subscribe(watch => {
        this.util.getPosts_Selected(id)
          .then(posts => this.dbPosts = posts);
      })
    }

  async openComposePostModal() {
    const modal = await this.modalCtrl.create({
      component: ComposePostComponent,
    });
    return modal.present();
  }

  showEditButtone() {
    this.editButton = this.editButton == '' ? 'primary' : '';
  }
}