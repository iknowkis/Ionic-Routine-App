import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';
import { MainNavbarComponent } from 'src/app/shared/components/main-navbar/main-navbar.component';

@Component({
  selector: 'app-main-community',
  templateUrl: './main-community.page.html',
  styleUrls: ['./main-community.page.scss'],
})
export class MainCommunityPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private navBar: MainNavbarComponent,
    ) { }

  ngOnInit() {
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
}