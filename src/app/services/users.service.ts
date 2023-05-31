import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient,
    ) {}
  private APIurl = 'http://127.0.0.1:8000/api'

  addUser(data: any): Observable<any> {
    return this._http.post(this.APIurl + '/auth/register', data)
  }

  login(data: any): Observable<any> {
    return this._http.post(this.APIurl + '/users/login', data);
  }

  getUser(): Observable<any> {
    return this._http.get(this.APIurl + '/users');
  }
}