import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent {

  constructor(
    private modalCtrl: ModalController,
    ) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  submit(event) {
    console.log(event.path[1].textContent, event.path[4].classList[2]);
    this.modalCtrl.dismiss([event.path[1].textContent, event.path[4].classList[2]]);
    // console.log(event.target.innerText)
    // this.modalCtrl.dismiss(event.target.innerText)
  }
}