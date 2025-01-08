import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return themes', () => {
    expect(service.themes).toEqual([{ name: 'light', icon: 'wb_sunny' },
      { name: 'dark', icon: 'brightness_4' },
      { name: 'system', icon: 'desktop_windows'},]);
  });

  it('should return default theme', () => {
    const selectedIconString = service.selectedThemeIcon();
    expect(selectedIconString).toEqual('desktop_windows');
  });

  it('should select a theme and return selected theme icon', () => {
    service.applyTheme({ name: 'dark', icon: 'brightness_4' });
    const selectedIconString = service.selectedThemeIcon();
    expect(selectedIconString).toEqual('brightness_4');
  });

  it('should apply theme and set body property', () => {
    service.applyTheme({ name: 'light', icon: 'wb_sunny' });
    expect(document.body.style.getPropertyValue('color-scheme')).toEqual('light');
  });
});
