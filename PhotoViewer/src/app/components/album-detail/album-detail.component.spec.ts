import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { AlbumDetailComponent } from './album-detail.component';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../../models/photo';
import { PhotoService } from '../../services/photos.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;
  let photoSpy: jasmine.SpyObj<PhotoService>;

  const mockAlbums = [
    {
      albumId: 1,
      title: '',
      photos: [
        { photoId: 1, title: 'Kyle', url: '' },
        { photoId: 2, title: 'Tex', url: '' }
      ]
    },
    {
      albumId: 2,
      title: '',
      photos: [
        { photoId: 3, title: 'Adam', url: '' },
        { photoId: 4, title: 'Steve', url: '' }
      ]
    }];

  beforeEach(async () => {
    photoSpy = jasmine.createSpyObj('PhotoService', ['get']);
    photoSpy.get.and.returnValue(of(mockAlbums[0]));

    await TestBed.configureTestingModule({
      imports: [ AlbumDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ albumId: '1' }) }},
        { provide: PhotoService, useValue: photoSpy},
        { provide: HttpClient, useValue: provideHttpClientTesting()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call photo service to get album by id', () => {
    expect(photoSpy.get).toHaveBeenCalled();
  })

  it('should have a param value of 1', () => {
    component.album$?.subscribe(album => {
      expect(album.albumId).toEqual(1)
      expect(album.photos.length).toEqual(2);
    });
  });
});
