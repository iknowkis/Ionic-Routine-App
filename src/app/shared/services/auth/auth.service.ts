import { Injectable } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { StorageService } from '../storage/storage.service';
import { DbcrudService } from '../dbcrud/dbcrud.service';
import { Account } from '../../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dbService: DbcrudService,
    private storageService: StorageService,
  ) { }

  async initAuth() {
    let authValue = await this.getAuthValue();
    if(authValue==null) {
      this.addDbAccount();
    }
  }

  addDbAccount() {
    let nameString = `User_${uuidv4().slice(0,4)}`;
    let passwordString = uuidv4().slice(0,8);
    let initedAuthValue = {
      name: nameString,
      password: passwordString,
    };
    this.saveAccount(initedAuthValue);
  }

  saveAccount(account: Account) {
    this.isDuplicatedDbAccounts(account).then(async isDuplicated => {
      if (isDuplicated) {
        this.initAuth();
      }
      else {
        this.dbService.addAccount(account);
        await this.storageService.set('auth', this.getAccountWithId(account));
      }
    })
  }

  isDuplicatedDbAccounts(data: Account): Promise<boolean> {    
    return new Promise(async (resolve, reject) => {
      this.dbService.getAccounts().subscribe(accounts => {
        let isDepulicated = accounts.filter((e: any) =>
          e.payload.doc.data().name == data.name);
          isDepulicated.length ? resolve(true) : resolve(false);
      });
    });
  }

  getAccountWithId(account: Account): Promise<object> {
    let dbAccount: object;
    return new Promise(resolve => {
      this.dbService.getAccounts().pipe(
         take(1)
         ).subscribe((data:any) => {
          data.map(e=> {
            if(e.payload.doc.data().name == account.name) {
              dbAccount =  {
                id: e.payload.doc.id,
                ...e.payload.doc.data(),
              } as Account;
            }
          })
          resolve(dbAccount);
        })
    })
  }
  
  getAuthValue() {
    return this.storageService.getValue('auth');
  }
}