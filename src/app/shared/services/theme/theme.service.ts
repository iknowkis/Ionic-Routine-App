import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public renderer: Renderer2;
  public currentTheme;

  constructor(
    @Inject(DOCUMENT) private document: Document,

    private rendererFactory: RendererFactory2,
    private storageService: StorageService,
    ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  
  async dynamicTheme(value) {
    await this.activeTheme(value);
    await this.storageService.remove('themeValue');
    await this.storageService.set('themeValue', value)
  }
  
  activeTheme(item) {
    this.renderer.removeClass(this.document.body, this.currentTheme);
    this.currentTheme = item;
    this.renderer.addClass(this.document.body, item);
  }

  async initTheme() {
    await this.storageService.create();
    this.activeTheme(await this.getThemeValue());
  }

  async getThemeValue() {
    return await this.storageService.getValue('themeValue');
  }
}
