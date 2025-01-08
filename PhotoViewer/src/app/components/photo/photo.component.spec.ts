import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from '../../models/photo';
import { PhotoComponent } from './photo.component';
import { signal } from '@angular/core';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  const mockPhotos: Photo[] = [
    {
      photoId: 1,
      title: 'kyle',
      url: 'test',
    },
    {
      photoId: 2,
      title: 'Adam',
      url: 'test',
    },
    {
      photoId: 3,
      title: 'steve',
      url: 'test',
    },
    {
      photoId: 4,
      title: 'tex',
      url: 'test',
    },
    {
      photoId: 5,
      title: 'ashley',
      url: 'test',
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    fixture.componentRef.setInput('photos', mockPhotos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 4 preview photos', () => {
    expect(component.previewPhotos()).toEqual(mockPhotos.slice(0, 4));
  });
  it('should display all photos when detailed is true', () => {
    fixture.componentRef.setInput('detailed', true);
    fixture.detectChanges();
    expect(component.getPhotosToDisplay()).toEqual(mockPhotos);
  });
});
