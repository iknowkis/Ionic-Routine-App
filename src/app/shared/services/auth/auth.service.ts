import { Injectable } from '@angular/core';

import { Account } from '../../models/db.model';

import { StorageService } from '../storage/storage.service';
import { DbcrudService } from '../dbcrud/dbcrud.service';
import { initAccount_util } from '../../util/data.util';
import { ToastService } from '../toast/toast.service';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private util: UtilService,
    private toast: ToastService,
    private dbService: DbcrudService,
    private storageService: StorageService,
  ) { }

  async initAuth() {
    let authValue = await this.getAuthValue();
    if(authValue==null) {
      this.initAccount();
    }
  }
  getAuthValue() {
    return this.storageService.getValue('auth');
  }

  initAccount() {
    let initedAuthValue = initAccount_util();
    this.saveAccount(initedAuthValue);
  }

  saveAccount(account: Account) {
    this.isDuplicatedAccount(account)
      .then(async isDuplicated => {
        if (isDuplicated) {
          this.initAuth();
        }
        else {
          this.dbService.addAccount(account);
          await this.storageService.set('auth', this.getAccountWithId(account));
        }
    })
  }
  isDuplicatedAccount(data: Account, id?:string): Promise<boolean> {
    return new Promise(async resolve => {
      this.dbService.getAccounts().subscribe(accounts => {
        let isDuplicated = accounts.filter((e: any) =>
          (e.payload.doc.data().name == data.name) && (e.payload.doc.id != id));
          isDuplicated.length ? resolve(true) : resolve(false);
      })
    })
  }
  getAccountWithId(account: Account): Promise<object> {
    return this.util.getAccountWithId(account);
  }

  async updateAccount(id: string, data: Account) {
    this.isDuplicatedAccount(data, id)
     .then(async isDuplicated => {
        if (isDuplicated) {
          this.presentToast(data.name);
        }
        else {
          this.dbService.updateAccount(id, data);
          await this.storageService.set('auth', data);
        }
    })
  }
  presentToast(name: string) {
    this.toast.presentToast(`Name '${name}' already exists.`, 'danger');
  }
}