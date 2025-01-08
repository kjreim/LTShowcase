import { Injectable, inject } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  
  private readonly _svgIcons: { [key: string]: string } = {
    'profile-default': 'assets/profile-default.svg',
  }

  private readonly matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  constructor(  ) { }

  public initialize(): void {
    Object.keys(this._svgIcons).forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.sanitizer.bypassSecurityTrustResourceUrl(this._svgIcons[key]));
    });
  }
}
