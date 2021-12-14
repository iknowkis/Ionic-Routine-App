import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from 'src/app/shared/models/db.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

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
  ) {
  }
  ionViewWillEnter() {
  }

  updateDbAccount() {
    this.auth.getAuthValue()
      .then((account: Account) => {
        this.auth.updateAccount(account.id, this.authValue);
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