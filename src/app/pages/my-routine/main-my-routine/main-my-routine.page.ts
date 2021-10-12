import { Component, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainNavbarComponent } from 'src/app/shared/components/main-navbar/main-navbar.component';
import { ComposeRoutineComponent } from '../../../modals/compose-routine/compose-routine.component';
import { RoutineModel } from '../../../shared/models/item.model';
import { StorageService } from '../../../shared/services/storage/storage.service';

@Component({
  selector: 'app-main-my-routine',
  templateUrl: './main-my-routine.page.html',
  styleUrls: ['./main-my-routine.page.scss'],
})
export class MainMyRoutinePage {

  @Output() _storageData: RoutineModel[];
  @Output() _editActivate = false;

  constructor(
    private modalCtrl: ModalController,
    private navBar: MainNavbarComponent,
    private storageService: StorageService,
  ) { }
  
  async openComposeRoutineModal() {
    const modal = await this.modalCtrl.create({
      component: ComposeRoutineComponent,
      // swipeToClose: true, // <-- Enable swipe to close only in iOS.
      // presentingElement: await this.modalCtrl.getTop()
    });
    modal.onDidDismiss().then(() => {
      this.getStorageData();
      this.navBar.getRoutineLength();
    });
    return modal.present();
  }

  async ionViewWillEnter() {
    this.getStorageData();
  }

  async getStorageData() {
    this._storageData = await this.storageService.initStorageData();
  }  
}