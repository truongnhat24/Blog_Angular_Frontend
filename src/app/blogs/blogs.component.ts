import { Component, OnInit, SimpleChanges } from '@angular/core';
import { BlogsService } from '../services/blogs/blogs.service';
import { CoreService } from '../core/core.service';
import jwt_decode from "jwt-decode";
import { DeleteComponent } from './delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _router: Router
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
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  openDelDialog(blogId:number) {
    const dialogRef = this._dialog.open(DeleteComponent, {
      data: { blogId: blogId },
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getBlogsList()
      }
    })
  }
}
