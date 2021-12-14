import { Component, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';
import { DbcrudService } from 'src/app/shared/services/dbcrud/dbcrud.service';
import { UtilService } from 'src/app/shared/services/util/util.service';


@Component({
  selector: 'app-main-community',
  templateUrl: './main-community.page.html',
  styleUrls: ['./main-community.page.scss'],
})
export class MainCommunityPage {

  @Output() dbPosts: any;

  constructor(
    private modalCtrl: ModalController,

    private util: UtilService,
    private dbService: DbcrudService,
    ) {
      this.getDbPosts();
    }

  async openComposePostModal() {
    const modal = await this.modalCtrl.create({
      component: ComposePostComponent,
    });
    return modal.present();
  }

  getDbPosts() {
    this.dbService.getPosts().subscribe(spyOn => {
      this.util.getPosts()
        .then(posts=> this.dbPosts = posts);
    })
  }
}