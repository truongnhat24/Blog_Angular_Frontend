import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class GetInfoJwtService {

  constructor(
  ) { }

  getAuth():any {
    var access_token:any = localStorage.getItem('access_token');
    return jwt_decode(access_token);
  }
}