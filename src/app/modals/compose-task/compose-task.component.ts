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
export class ComposeTaskComponent implements OnInit {
  routineKey: string; // Got from detail-routine.page
  task: any;
  _storageData: Promise<RoutineModel[]>;

  constructor(
    public data: RoutineModel,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    ) {
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

  async ngOnInit() {
    this._storageData = this.storageService.initStorageData();
    this.data = (await this._storageData).filter(e=>e.routine.key === this.routineKey)[0]
    this.data = RoutineModel.initTaskModel(this.data);
    this.task = this.data.task[0];
    console.log('DATA', this.data)
    console.log('TASK', this.task)
  }
  
  async saveTask() {
    // await this.storageService.setStorageData(await this._storageData, this.data)
      // .then( savedData => this._storageData = savedData as any);
    this.dismissModal();
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}