import { Component, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';
import { MainNavbarComponent } from 'src/app/shared/components/main-navbar/main-navbar.component';
import { Post } from 'src/app/shared/models/db.model';
import { DbcrudService } from 'src/app/shared/services/dbcrud/dbcrud.service';


@Component({
  selector: 'app-main-community',
  templateUrl: './main-community.page.html',
  styleUrls: ['./main-community.page.scss'],
})
export class MainCommunityPage {

  @Output() dbPosts: any;

  constructor(
    private modalCtrl: ModalController,
    private navBar: MainNavbarComponent,

    private dbService: DbcrudService,
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

  getDbPosts() { 
    this.dbService.getPosts().subscribe(post => {
      this.dbPosts = post.map((e: any) => {
          return {
            post_id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Post;
      });
    });
  }
}