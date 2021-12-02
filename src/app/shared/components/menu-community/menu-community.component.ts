import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { menuItemListModel } from '../../models/db.model';

@Component({
  selector: 'app-menu-community',
  templateUrl: './menu-community.component.html',
  styleUrls: ['./menu-community.component.scss'],
})
export class MenuCommunityComponent implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    ) { }

  ngOnInit() {
  }
  
  menuItemList: menuItemListModel[] = [
    {
      item_color: 'medium',
      icon_color: '', icon_name: 'chatbubbles-outline',
      label_color: '', label_text: 'Main'
    },
    {
      item_color: '',
      icon_color: 'primary', icon_name: 'cube',
      label_color: 'primary', label_text: 'My post'
    },
    {
      item_color: '',
      icon_color: 'danger', icon_name: 'thumbs-up',
      label_color: 'danger', label_text: 'Liked'
    },
    {
      item_color: '',
      icon_color: 'danger', icon_name: 'heart',
      label_color: 'danger', label_text: 'Followed'
    },
    {
      item_color: '',
      icon_color: '', icon_name: 'archive',
      label_color: '', label_text: 'Archived'
    },
    {
      item_color: '',
      icon_color: '', icon_name: 'paper-plane',
      label_color: '', label_text: 'Message'
    },
  ]

  closeMenu() {
    this.menuCtrl.close();
  }
}