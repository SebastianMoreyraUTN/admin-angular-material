import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  private renderer: Renderer2;
  public colorScheme: string;
  // Define prefix for clearer and more readable class names in scss files

  constructor(rendererFactory: RendererFactory2) {
    // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  _setColorScheme(scheme) {
    this.colorScheme = scheme;
    // Save prefers-color-scheme to localStorage
    localStorage.setItem('prefers-color', scheme);
  }

  _getColorScheme() {
    // Check if any prefers-color-scheme is stored in localStorage
    if (localStorage.getItem('prefers-color')) {
      // Save prefers-color-scheme from localStorage
      this.colorScheme = localStorage.getItem('prefers-color');
    }
  }

  load() {
    this._getColorScheme();
    this.renderer.addClass(document.body, this.colorScheme);
  }

  update(scheme) {
    this._setColorScheme(scheme);
    // Remove the old color-scheme class
    if (scheme != 'dark-theme') {
      this.renderer.removeClass(document.body, 'dark-theme');
    } else {
      this.renderer.addClass(document.body, this.colorScheme);
    }
  }

  currentActive() {
    return this.colorScheme;
  }
}
