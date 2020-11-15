import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {

  currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private tokenSubject: BehaviorSubject<string>;
  private token: Observable<string>;

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.tokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('token')));
    this.token = this.tokenSubject.asObservable();
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get tokenValue(): string {
    return this.tokenSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {username, password})
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.token && data.user && data.refreshToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(data.token));
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
          this.currentUserSubject.next(data.user);
          this.tokenSubject.next(data.token);
        }
        return data.user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('dishes');
    localStorage.removeItem('favDishes');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('__paypal_storage__');
    this.router.navigate(['/home']);
  }

  confirm(token: string): any {
    return this.http.post<any>(`${environment.apiUrl}/auth/confirmation`, {token}).pipe(map(response => response));
  }

  forgot(email: string): any {
    return this.http.post<any>(`${environment.apiUrl}/auth/forgot`, {email}).pipe((response) => response);
  }

  reset(password: string, token: string): any {
    return this.http.post<any>(`${environment.apiUrl}/auth/reset`, {password, token}).pipe((response) => response);
  }

  resendTokenPost(email: string): any {
    return this.http.post<any>(`${environment.apiUrl}/auth/resend`, {email}).pipe((response) => response);
  }

  refreshToken(username: string, refreshToken: string): any {
    return this.http.post<any>(`${environment.apiUrl}/users/token`, {username, refreshToken}).pipe(map(response => response));
  }

  isTokenExpired(): any {
    return this.jwtHelperService.isTokenExpired(JSON.parse(localStorage.getItem('token')));
  }

  getRefreshToken(): any {

    if (localStorage.getItem('refreshToken')) {
      return JSON.parse(localStorage.getItem('refreshToken'));
    }
  }

}
