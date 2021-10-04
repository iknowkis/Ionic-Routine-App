import { Component, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComposeRoutineComponent } from 'src/app/modals/compose-routine/compose-routine.component';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-main-my-routine',
  templateUrl: './main-my-routine.page.html',
  styleUrls: ['./main-my-routine.page.scss'],
})
export class MainMyRoutinePage implements OnInit {

  @Output() _storageData: any;

  constructor(
    public storageService: StorageService,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getStorageData();
  }

  async getStorageData() {
    this._storageData = await this.storageService.initStorageData();
  }

  async openComposeRoutineModal() {
    const modal = await this.modalCtrl.create({
      component: ComposeRoutineComponent,
      // swipeToClose: true, // <-- Enable swipe to close only in iOS.
      // presentingElement: await this.modalCtrl.getTop()
    });
    modal.onDidDismiss().then(() => {
      this.getStorageData();
    });
    return modal.present();
  }
}