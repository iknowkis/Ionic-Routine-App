import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposePostComponent } from 'src/app/modals/compose-post/compose-post.component';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
  }
  
  async openComposePostModal() {
    const modal = await this.modalCtrl.create({
      component: ComposePostComponent,
      // swipeToClose: true, // <-- Enable swipe to close only in iOS.
      // presentingElement: await this.modalCtrl.getTop()
    });
    return modal.present();
  }
}