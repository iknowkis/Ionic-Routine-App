import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  
  public _selectedTheme: string;

  constructor(
    private storageService: StorageService,
    private theme: ThemeService,
  ) { }

  ngOnInit() {
    this.getThemeValue();
  }

  async getThemeValue() {
    this._selectedTheme = await this.theme.getThemeValue()
  }
  
  async changeTheme() {
    await this.theme.dynamicTheme(this._selectedTheme);
  }
}