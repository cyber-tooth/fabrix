import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {User} from '../models/index';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): any {
    return this.http.get<any>(`${environment.apiUrl}/v1/users`).pipe(map(response => response));
  }

  show(id: string): any {
    return this.http.get<any>(`${environment.apiUrl}/v1/users/` + id).pipe(map(response => response));
  }

  create(user: User): any {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/register`, user).pipe(map(response => response));
  }

  update(user: User): any {
    return this.http.put<any>(`${environment.apiUrl}/v1/users/` + user.id, user).pipe(map(response => response));
  }

  changePassword(currentPassword: string, newPassword: string, username: string, refreshToken: string): any {
    return this.http.post<any>(`${environment.apiUrl}/v1/users/changePassword`, {currentPassword, newPassword, username, refreshToken})
      .pipe(map(response => console.log('response', response)));
  }

  delete(id: string): any {
    return this.http.delete(`${environment.apiUrl}/v1/users/` + id).pipe(map(response => response));
  }
}
