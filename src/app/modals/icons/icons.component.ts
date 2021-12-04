import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent {
  
  // 🙋‍♂️🚗🙏✌
  itemList = [
    {name: 'happy-outline', color: 'tertiary'},
    {name: 'rocket-outline', color: 'danger'},
    {name: 'thumbs-up-outline', color: 'warning'},
    {name: 'logo-whatsapp', color: 'primary'},

    {name: 'barbell-outline', color: 'tertiary'},
    {name: 'heart', color: 'danger'},
    {name: 'business-outline', color: 'warning'},
    {name: 'cube-outline', color: 'primary'},

    {name: 'hourglass-outline', color: 'tertiary'},
    {name: 'airplane', color: 'danger'},
    {name: 'hand-right-outline', color: 'warning'},
    {name: 'time-outline', color: 'primary'},
    
    {name: 'man-outline', color: 'tertiary'},
    {name: 'woman-outline', color: 'danger'},
    {name: 'body-outline', color: 'warning'},
    {name: 'accessibility-outline', color: 'primary'},
    
    {name: 'person-outline', color: 'tertiary'},
    {name: 'notifications-outline', color: 'danger'},
    {name: 'pie-chart-outline', color: 'warning'},
    {name: 'cloudy-outline', color: 'primary'},

    {name: 'reader-outline', color: 'tertiary'},
    {name: 'logo-youtube', color: 'danger'},
    {name: 'flash-outline', color: 'warning'},
    {name: 'alarm-outline', color: 'primary'},
  ]

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