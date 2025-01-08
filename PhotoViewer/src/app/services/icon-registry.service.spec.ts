import { MatIcon, MatIconRegistry } from '@angular/material/icon';

import { DomSanitizer } from '@angular/platform-browser';
import { IconRegistryService } from './icon-registry.service';
import { TestBed } from '@angular/core/testing';

describe('IconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [MatIconRegistry, 
      {provide: DomSanitizer, useValue: {
        bypassSecurityTrustResourceUrl: () => ''
      }}
    ]});
    service = TestBed.inject(IconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize', () => {
    const matIconRegistry = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);
    const addSvgIconSpy = spyOn(matIconRegistry, 'addSvgIcon');
    const bypassSecurityTrustResourceUrlSpy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');
    service.initialize();
    expect(addSvgIconSpy).toHaveBeenCalled();
    expect(bypassSecurityTrustResourceUrlSpy).toHaveBeenCalled();
  });
});
