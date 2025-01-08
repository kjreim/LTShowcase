import { Component, OnInit, inject } from '@angular/core';

import { HeaderComponent } from "./components/header/header.component";
import { IconRegistryService } from './services/icon-registry.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  private readonly iconRegistry: IconRegistryService = inject(IconRegistryService);

  public title: string = 'PhotoViewer';

  public ngOnInit(): void {
    this.iconRegistry.initialize();
  }
}
