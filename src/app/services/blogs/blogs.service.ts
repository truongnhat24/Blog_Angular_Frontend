import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(
    private _http: HttpClient,
    private _fileUS: FileUploadService
  ) { }
  private APIurl = 'http://127.0.0.1:8000/api'

  // async addBlog(data: any): Promise<Observable<any>> {
  //   this._fileUS.upload(data.file);
  //   return this._http.post('http://localhost:3000/blogs', data)
  // }
  addBlog(data: any): Observable<any> {
    return this._http.post(this.APIurl + '/posts', data)
  }

  updateBlog(id: number, data: any): Observable<any> {
    return this._http.patch(this.APIurl + `/posts/${id}`, data)
  }

  getBlogsList(id:number): Observable<any> {
   return this._http.get(this.APIurl + `/posts/index/${id}`);
  }

  deleteBlog(id:number): Observable<any> {
    return this._http.delete(this.APIurl + `/posts/${id}`)
  }

  viewBlog(id: number): Observable<any> {
    return this._http.get(this.APIurl + `/posts/${id}`);
  }
}