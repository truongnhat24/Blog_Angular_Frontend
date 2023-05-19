import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs/blogs.service';
import { CoreService } from '../core/core.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit{
  title = "Blogs";
  API = 'http://127.0.0.1:8000/';
  data:any;
  user_id : number = 0;
  access_token:any;
  decoded:any;
  constructor(
    private _blogsService: BlogsService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.access_token = localStorage.getItem('access_token');
    this.decoded = jwt_decode(this.access_token);
    this.user_id = this.decoded.id;
    this.getBlogsList();
  }
  getBlogsList() {
    this._blogsService.getBlogsList(this.user_id).subscribe({
      next: (res) => {
      this.data = res.data[0];
        console.log(this.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
