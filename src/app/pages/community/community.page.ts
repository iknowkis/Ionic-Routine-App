import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { menuItemListModel } from 'src/app/shared/models/db.model';
import { menuList } from 'src/app/shared/models/item.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    ) {
     }

  ngOnInit() {
  }
  
  menuItemList: menuItemListModel[] = menuList;

  closeMenu() {
    this.menuCtrl.close();
  }
}