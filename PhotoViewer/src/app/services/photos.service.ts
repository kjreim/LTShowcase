import { Album } from '../models/album';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private url: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public list(): Observable<Album[]> {
    const url = `${this.url}/albums`;
    return this.httpClient.get<Album[]>(url);
  }

  public get(id: number): Observable<Album> {
    const url: string = `${this.url}/albums/${id}`;
    return this.httpClient.get<Album>(url);
  }
}
