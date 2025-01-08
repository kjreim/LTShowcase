import { Photo } from './photo';

export class Album {
    
    constructor(public albumId: number, public title: string, public photos: Photo[]) {
    }
}