import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {User} from '../models';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private tokenSubject: BehaviorSubject<string>;
  private token: Observable<string>;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
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

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/login`, {email, password})
      .pipe(map(data => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('token', JSON.stringify(data.token));
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }



  confirm(token: string) {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/verify-email`, {token}).pipe(map(response => response));
  }

  forgot(email: string) {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/forgot-password`, {email}).pipe((response) => response);
  }

  reset(password: string, token: string) {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/reset-password`, {
      password,
      token
    }).pipe((response) => response);
  }


  refreshToken(token: string, ipAddress: string) {
    return this.http.post<any>(`${environment.apiUrl}/v1/auth/refresh-token`, {
      token,
      ipAddress
    }).pipe(map(response => response));
  }

  isTokenExpired() {
    return this.jwtHelperService.isTokenExpired(JSON.parse(localStorage.getItem('token')));
  }

}
