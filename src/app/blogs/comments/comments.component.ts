import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { CoreService } from 'src/app/core/core.service';
import { CommentsService } from 'src/app/services/comments/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{
  API = 'http://127.0.0.1:8000/';
  datas:any;
  blogId:number = 0;
  addCommentForm!: FormGroup;
  replyForm!: FormGroup;
  check:number = 0;
  showReplyForm: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _commentsService: CommentsService,
    private _coreService: CoreService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.addCommentForm = this._fb.group({
      content: '',
      post_id: '',
    }),
    this.replyForm = this._fb.group({
      content : "",
      post_id : "",
      user_id : "",
    })
  }

  ngOnInit(): void {
    this.loadComment();
    this.check = this.checkUser();
  }

  loadComment() : void {
    this._route.params.subscribe(params => {
      this.blogId = params['id'];
    });
    this._commentsService.getCommentsList(this.blogId).subscribe((data:any) => {
      this.datas = data;
      console.log(this.datas);
    });
  }

  checkUser(): number{
    var access_token:any = localStorage.getItem('access_token');
    var decoded:any = jwt_decode(access_token);
    var user_id:number = decoded.id;
    return user_id
  }

  onCommentSubmit() {
    if(this.addCommentForm.valid) {
      const formData = new FormData();
      formData.append('content', this.addCommentForm.value.content);
      formData.append('post_id', this.blogId.toString());
      
      this._commentsService.addComment(formData).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Blog added successfully');
          this.loadComment();
          this.addCommentForm.reset();
        },
        error: err => console.log(err)
      })
    }
  }

  onDelSubmit(commentId:number) {
    this._commentsService.deleteComment(commentId).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Comment deleted successfully')
        this.loadComment();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}