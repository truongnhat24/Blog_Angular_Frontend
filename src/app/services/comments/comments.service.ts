import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(
    private _http: HttpClient,
  ) { }

  private APIurl = 'http://127.0.0.1:8000/api'

  addComment(data: any): Observable<any> {
    return this._http.post(this.APIurl + '/comments', data)
  }

  updateComment(id: number, data: any): Observable<any> {
    return this._http.put(this.APIurl + `/comments/${id}`, data)
  }

  getCommentsList(id:number): Observable<any> {
   return this._http.get(this.APIurl + `/comments/index/${id}`);
  }

  deleteComment(id:number): Observable<any> {
    return this._http.delete(this.APIurl + `/comments/${id}`)
  }
}