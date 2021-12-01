import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthComponent } from '../../modals/auth/auth.component';

import { ThemeService } from '../../shared/services/theme/theme.service';
import { StorageService } from '../../shared/services/storage/storage.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Account } from 'src/app/shared/models/db.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  
  public selectedTheme: string;
  public authValue: Account;

  constructor(
    private modalCtrl: ModalController,

    private auth: AuthService,
    private theme: ThemeService,
  ) {
    this.getStorageThemeValue();
    this.getStorageAuthValue();
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
  }

  // Theme
  async getStorageThemeValue() {
    this.selectedTheme = await this.theme.getThemeValue()
  }
  async changeTheme() {
    await this.theme.dynamicTheme(this.selectedTheme);
  }

  //Auth
  async getStorageAuthValue() {
    this.authValue = await this.auth.getAuthValue();
  }
  async openAuthModal() {
    const modal = await this.modalCtrl.create({
      component: AuthComponent,
      componentProps: {
        authValue: this.authValue,
      }
    });
    modal.onDidDismiss().then(() => {
      this.getStorageAuthValue();
    });
    return modal.present();
  }
}