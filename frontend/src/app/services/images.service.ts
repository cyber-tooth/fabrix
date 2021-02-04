import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from "rxjs/operators";
import {Image} from "../models/image";


@Injectable()
export class ImagesService {

  constructor(private http: HttpClient) {
  }

  getAll(): any {
    return this.http.get<any>(`${environment.apiUrl}/v1/image`).pipe(map(response => response));
  }

  create(image: Image): any {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/image`, image).pipe(map(response => response));
  }

  delete(id: string): any {
    return this.http.delete(`${environment.apiUrl}/v1/image/` + id).pipe(map(response => response));
  }
  getImageById(id: string): any {
    return this.http.get(`${environment.apiUrl}/v1/image/` + id).pipe(map(response => response));
  }
}
