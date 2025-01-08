import { Component, OnInit, inject, input } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Album } from '../../models/album';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PhotoComponent } from '../photo/photo.component';
import { PhotoService } from './../../services/photos.service';

@Component({
  selector: 'app-album-detail',
  imports: [
    MatCardModule,
    PhotoComponent,
    AsyncPipe
  ],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent implements OnInit {

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly photoService: PhotoService = inject(PhotoService);

  public album$: Observable<Album> | null = null;

  public ngOnInit(): void {
    this.album$ = this.activatedRoute.params.pipe(
      switchMap(params => this.photoService.get(params['albumId']))
    );
  }
}
