import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from 'src/app/shared/models/db.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { DbcrudService } from 'src/app/shared/services/dbcrud/dbcrud.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {

  authValue: Account;
  showPassword: boolean = false;

  constructor(
    private modalCtrl: ModalController,

    private auth: AuthService,
    private dbService: DbcrudService,
    private storageService: StorageService,
  ) {
  }
  ionViewWillEnter() {
  }

  updateDbAccount() {
    this.auth.getAuthValue().then(async (account: Account) => {
      this.dbService.updateAccount(account.id, this.authValue);
      await this.storageService.set('auth', this.authValue);
    });
    this.dismissModal();
  }

  showHide() {
    this.showPassword = !this.showPassword;
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
}