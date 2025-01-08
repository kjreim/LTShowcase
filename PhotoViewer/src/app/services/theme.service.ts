import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly _themes: Theme[] = [
    { name: 'light', icon: 'wb_sunny' },
    { name: 'dark', icon: 'brightness_4' },
    { name: 'system', icon: 'desktop_windows'},
   ];

   private _selectedTheme: WritableSignal<Theme> = signal<Theme>(this._themes[2]);

  constructor() { }

  public get themes(): Theme[] {  
    return this._themes;
  }
  public get selectedThemeIcon(): Signal<string> {
    return computed(() => this._selectedTheme().icon);
  }

  public applyTheme(theme: Theme): void {
    this._selectedTheme.set(theme);
    const colorShceme = theme.name === 'system' ? 'light dark' : theme.name;
    document.body.style.setProperty('color-scheme', colorShceme);
  }
}
