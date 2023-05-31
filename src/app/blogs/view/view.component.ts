import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { LikeService } from 'src/app/services/likes/like.service';
import { __param } from 'tslib';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{
  API = 'http://127.0.0.1:8000/';
  data:any;
  check:number = 0;
  blogId:number = 0;
  constructor(
    private _blogsService: BlogsService,
    private _likeService: LikeService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.getData();
    this.check = this.checkUser();
  }
  
  getData(): void {
    this._route.params.subscribe(params => {
      this.blogId = params['id'];
    });
    this._blogsService.viewBlog(this.blogId).subscribe((data:any) => {
      this.data = data.data[0];
      console.log(this.data);
    });
  }

  checkUser(): number{
    var access_token:any = localStorage.getItem('access_token');
    var decoded:any = jwt_decode(access_token);
    var user_id:number = decoded.id;
    return user_id
  }

  likeSubmit(blgId:number, type:string, value:any){
    var like = Number(value.children[1].innerHTML)
    var likeForm = {
      type_id: blgId,
      type: type
    };
    this._likeService.addLike(likeForm).subscribe({
      next: () => {
        if(value.firstChild.innerHTML == 'favorite') {
          value.firstChild.innerHTML = "favorite_border";
          value.children[1].innerHTML = like -1;
        } else {
          value.firstChild.innerHTML = "favorite";
          value.children[1].innerHTML = like +1;
        }
      },
      error: err => console.log(err)
    })
  }
}