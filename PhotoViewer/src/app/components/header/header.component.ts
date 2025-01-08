import { Component, Signal, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Theme } from '../../models/theme';
import { ThemeService } from '../../services/theme.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TitleCasePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  private readonly router: Router = inject(Router);
  private readonly themeService: ThemeService = inject(ThemeService);

  public themes: Theme[] = this.themeService.themes;
  public selectedThemeIcon: Signal<string> = this.themeService.selectedThemeIcon;

  public onHeaderClick(): void {
    this.router.navigate(['']);
  }

  public onThemeChange(themeName: Theme): void {
    this.themeService.applyTheme(themeName);
  }
}
