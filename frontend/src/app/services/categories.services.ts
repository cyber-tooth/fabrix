import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable()
export class CategoriesServices {

  constructor(private http: HttpClient) {
  }

  getMainCategories(): any {
    return this.http.get<any>(`${environment.apiUrl}/v1/categories/main`).pipe(map(response => response));
  }

  getChildCategories(id: string): any {
    return this.http.get<any>(`${environment.apiUrl}/v1/categories/` + id).pipe(map(response => response));
  }

}
