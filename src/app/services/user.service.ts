import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url = GLOBAL.url;
  public user = new User('', '', '', '', '');
  public token;
  public identity;

  constructor(
    private http: HttpClient
  ) {}

  login(user, gettoken = null): Observable<any> {

    let json = user;

    if (gettoken !== null) {
      user.gettoken = true;
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login', json, {headers});
  }

  getToken(): Observable<any> {

    var token = localStorage.getItem('token');

    if (token) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;

  }

  getIdentity(): Observable<any> {

    var identity = JSON.parse(localStorage.getItem('identity'));

    if (identity) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }
}
