import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { EMPTY } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { LikeService } from 'src/app/services/likes/like.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{
  @ViewChild('like_element') likeElement!: ElementRef;
  API = 'http://127.0.0.1:8000/';
  datas:any;
  blogId:number = 0;
  addCommentForm!: FormGroup;
  replyForm!: FormGroup;
  editForm!: FormGroup;
  check:number = 0;
  checkOn: boolean = false;
  checkEditOn: boolean = false;
  showReplyForm: boolean = false;
  showEditForm: boolean = false;
  hisComment!: string;
  constructor(
    private _fb: FormBuilder,
    private _commentsService: CommentsService,
    private _likeService: LikeService,
    private _coreService: CoreService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.addCommentForm = this._fb.group({
      content : '',
      post_id : '',
    }),
    this.replyForm = this._fb.group({
      content : "",
      post_id : "",
    }),
    this.editForm = this._fb.group({
      content : '',
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
      this.datas = data.data[1];
      console.log(this.datas);
      this.datas.map((data:any) => {
        data.likeOn = false;
      })
      var likeCheck:any = data.data[0] 
      this.datas.map((data:any) => {
        likeCheck.map((check:any) => {
          if(check != EMPTY && data.user_id == check.user_id && data.id == check.type_id) {
            data.likeOn = true
          }
        })
      })
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

  showReplyFormClick(cmtId: number):void {
    this.showReplyForm = !this.showReplyForm;
    this.datas.map((data:any) => {
      data.checkOn = (data.id == cmtId) ? ((this.showReplyForm == true) ? true : false) 
                                        : (data.checkOn = false);
      // if (data.id == cmtId){
      //   data.checkOn = (this.showReplyForm == true) ? true : false;
      // } else {
      //   data.checkOn = false;
      // }
    })
  }

  showEditFormClick(cmtId: number, cmtCont: string):void {
    this.showEditForm = !this.showEditForm;
    this.hisComment = cmtCont;
    this.datas.map((data:any) => {
      data.checkEditOn = (data.id == cmtId) ? ((this.showEditForm == true) ? true : false) 
                                        : (data.checkEditOn = false);
    })
  }

  submitReply(cmtId: number){
    if(this.replyForm.valid) {
      const formData = new FormData();
      formData.append('content', this.replyForm.value.content);
      formData.append('post_id', this.blogId.toString());
      formData.append('cmtParent', cmtId.toString());
      this._commentsService.addComment(formData).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Comment reply added successfully');
          this.loadComment();
          this.showReplyForm = false;
          this.replyForm.reset();
        },
        error: err => console.log(err)
      })
    }
  }

  submitEdit(cmtId: number){
    if(this.editForm.valid) {
      this._commentsService.updateComment(cmtId, this.editForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Comment edited successfully');
          this.loadComment();
          this.showEditForm = false;
          this.editForm.reset();
        },
        error: err => console.log(err)
      })
    }
  }

  likeSubmit(cmtId:number, type:string, value:any){
    var like = Number(value.children[1].innerHTML)
    var likeForm = {
      type_id: cmtId,
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