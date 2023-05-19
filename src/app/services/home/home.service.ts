import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _http: HttpClient,
  ) { }
  private APIurl = 'http://127.0.0.1:8000/api'
  
  homeBlog(): Observable<any> {
    return this._http.get(this.APIurl + '/home')
  }
}
