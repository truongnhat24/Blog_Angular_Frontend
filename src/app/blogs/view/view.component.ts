import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{
  API = 'http://127.0.0.1:8000/';
  data:any;
  blogId:number = 0;
  constructor(
    private _blogsService: BlogsService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.getData();
  }
  
  getData(): void {
    this._route.params.subscribe(params => {
      this.blogId = params['id'];
    });
    this._blogsService.viewBlog(this.blogId).subscribe((data:any) => {
      this.data = data.data[0];
    });
  }
}