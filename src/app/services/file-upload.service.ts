import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private _http: HttpClient,
  ) { }

  upload(file: any) : Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this._http.post(`http://localhost:3000/files`, formData);
  }
}
