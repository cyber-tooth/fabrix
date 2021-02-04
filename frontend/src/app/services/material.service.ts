import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from "rxjs/operators";
import {Material} from "../models";


@Injectable()
export class MaterialService {

  constructor(private http: HttpClient) {
  }

  getAll(): any {
    return this.http.get<any>(`${environment.apiUrl}/v1/material`).pipe(map(response => response));
  }

  create(material: Material): any {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/material`, material).pipe(map(response => response));
  }

  delete(id: string): any {
    return this.http.delete(`${environment.apiUrl}/v1/material/` + id).pipe(map(response => response));
  }
  getDataById(id: string): any {
    return this.http.get(`${environment.apiUrl}/v1/material/` + id).pipe(map(response => response));
  }
}
