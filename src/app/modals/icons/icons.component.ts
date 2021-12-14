import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { iconList } from 'src/app/shared/models/item.model';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent {
  
  itemList = iconList;

  constructor(
    private modalCtrl: ModalController,
    ) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submit(event) {
    console.log(event.path[1].textContent, event.path[4].classList[2]);
    this.modalCtrl.dismiss([event.path[1].textContent, event.path[4].classList[2]]);
  }
}