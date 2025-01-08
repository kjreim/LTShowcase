import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Observable, debounceTime, map, startWith, switchMap } from 'rxjs';

import { Album } from './../../models/album';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PhotoComponent } from '../photo/photo.component';
import { PhotoService } from './../../services/photos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album',
  imports: [
    AsyncPipe,
    PhotoComponent,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private photoService: PhotoService = inject(PhotoService);

  public albumSearchForm: FormControl = new FormControl('');
  public formGroup: FormGroup = inject(FormBuilder).group({
    search: this.albumSearchForm
  });

  public albums$!: Observable<Album[]>;
  public filteredAlbums$!: Observable<Album[]>;

  constructor() {
    
  }

  public ngOnInit(): void {
    this.albums$ = this.photoService.list();
    this.filteredAlbums$ = this.createSearchObservable();
  }

  private createSearchObservable(): Observable<Album[]> {
    return this.albums$.pipe(
      switchMap(albums => {
        console.log('albums', albums);
        return this.filterAlbums(albums);
      })
    );
  }

  private filterAlbums(albums: Album[]): Observable<Album[]> {
    return this.albumSearchForm.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(search => {
        const searchValue = search.toLowerCase();
        return albums.filter(album => this.hasSearchTerm(album, searchValue));
      })
    )
  }

  private hasSearchTerm(album: Album, search: string): boolean {
    return album.photos.some(photo => photo.title.toLowerCase().includes(search));
  }
}
