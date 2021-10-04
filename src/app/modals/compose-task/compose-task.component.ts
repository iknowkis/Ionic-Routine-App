import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoutineModel } from 'src/app/shared/models/item.model';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-compose-task',
  templateUrl: './compose-task.component.html',
  styleUrls: ['./compose-task.component.scss'],
})
export class ComposeTaskComponent {
  routineKey: string; // Got from detail-routine.page
  task: any;
  _storageData: Promise<RoutineModel[]>;

  constructor(
    public data: RoutineModel,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    ) {
    this.data = RoutineModel.initTaskModel();
    this.task = this.data[0].task.value;

    this._storageData = storageService.initStorageData();
    }

  async openIconsModal() {
    const modal = await this.modalCtrl.create({
      component: IconsComponent,
    });
    modal.onDidDismiss().then(item => {
      this.task.iconName = item.data[0].split(' ').join('-') as string;
      this.task.iconColor = item.data[1]?.split('-')[2]
    });
    return modal.present();
  }
  
async saveTask() {
  this.data = (await this._storageData).filter(data=>data.routine.key === this.routineKey)[0]
  console.log('TASK this.data', this.data)
  // await this.storageService.setStorageData(await this._storageData, this.data)
    // .then( savedData => this._storageData = savedData as any);
  this.dismissModal();
}
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}