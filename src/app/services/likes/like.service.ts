import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
    private _http: HttpClient,
  ) { }

  private APIurl = 'http://127.0.0.1:8000/api'

  addLike(id:number, type:string): Observable<any> {
    return this._http.post(this.APIurl + `/likes/${id}/${type}`, id);
  }
}
