import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Material} from '../models';


@Injectable()
export class MaterialService {

  constructor(private http: HttpClient) {
  }

  getAll(params): any {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      params: new HttpParams().set('offset', params.offset).set('limit', params.limit).set('count', params.count)
    };
    return this.http.get<any>(`${environment.apiUrl}/v1/material?filters=${JSON.stringify(params.filters)}`, options).pipe(map(response => response));
  }

  create(material: Material): any {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/material`, material).pipe(map(response => response));
  }

  delete(id: string): any {
    return this.http.delete(`${environment.apiUrl}/v1/material/` + id).pipe(map(response => response));
  }

  getDataById(id: string): any {
    return this.http.get(`${environment.apiUrl}/v1/material/` + id + '/category_tree').pipe(map(response => response));
  }

  getCategoryTreeById(id): any {
    return this.http.get<any>(`${environment.apiUrl}/v1/material/` + id).pipe(map(response => response));
  }
}
