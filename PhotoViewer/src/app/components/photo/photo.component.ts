import { Component, computed, inject, input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Photo } from '../../models/photo';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';

@Component({
  selector: 'app-photo',
  imports: [
    MatCardModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {

  private readonly dialog = inject(MatDialog);

  public photos = input.required<Photo[] | undefined>();
  public detailed = input<boolean>(false);

  public previewPhotos = computed(() => this.photos()?.slice(0, 4));

  public imageLoaded: boolean = false;

  public getPhotosToDisplay = computed(() => {
    const allPhotos = this.photos();
    const previewPhotos = this.previewPhotos();
    return this.detailed() ? allPhotos : previewPhotos;
    
  });

  public onImageClick(photo: Photo): void {
    this.dialog.open(PhotoDialogComponent, { data: photo } );
  }
}
