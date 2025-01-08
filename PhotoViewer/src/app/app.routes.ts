import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'album/detail/:albumId',
        component: AlbumDetailComponent
    }
];
