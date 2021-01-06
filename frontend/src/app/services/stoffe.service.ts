import {Injectable} from '@angular/core';
import {Stoffe, User} from '../models/index';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from "rxjs/operators";


@Injectable()
export class StoffeService {

  constructor(private http: HttpClient) {
  }

  getAll(): any {
    return this.http.get<any>(`${environment.apiUrl}/v1/stoffe`).pipe(map(response => response));
  }

  create(material: Stoffe): any {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/stoffe`, material).pipe(map(response => response));
  }

  delete(id: string): any {
    return this.http.delete(`${environment.apiUrl}/v1/stoffe/` + id).pipe(map(response => response));
  }
  getDataById(id: string): any {
    return this.http.get(`${environment.apiUrl}/v1/stoffe/` + id).pipe(map(response => response));
  }
}
