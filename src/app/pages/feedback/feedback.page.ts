import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {

  memo: string;

  constructor(
    private storageService: StorageService,
    ) {
      this.getMemo();
    }

  async getMemo() {
    this.memo = (await this.storageService.getValue('feedback')).value;
  }
  onChange(newValue) {
    this.storageService.set('feedback', {value: newValue});
  }
}