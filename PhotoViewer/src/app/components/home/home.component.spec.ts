import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoService } from '../../services/photos.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
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

  beforeEach(() => {
    photoSpy = jasmine.createSpyObj('PhotoService', ['list']);
    photoSpy.list.and.returnValue(of(mockAlbums));

    TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule],
      providers: [
        { provide: PhotoService, useValue: photoSpy}, { provide: HttpClient, useValue: provideHttpClientTesting()}
      ]
    })

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create search observable of filtered albums', () => {
    expect(component.filteredAlbums$).toBeTruthy();
  });

  it('should call photo service to get albums', () => {
    expect(photoSpy.list).toHaveBeenCalled();
  });

  it('should filter albums based on search term and return single item', () => {
    component.albumSearchForm.setValue('Kyle');
    component.filteredAlbums$.subscribe(albums => {
      expect(albums.length).toEqual(1);
      expect(albums[0].photos.length).toEqual(1);
      expect(albums[0].photos[0].title).toEqual('Kyle');
    });
  });

  it('should filter albums based on search term and return single item', () => {
    component.albumSearchForm.setValue('e');
    component.filteredAlbums$.subscribe(albums => {
      expect(albums.length).toEqual(2);
      expect(albums[0].photos.length).toEqual(3);
    });
  });

});
