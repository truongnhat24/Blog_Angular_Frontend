import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  API = 'http://127.0.0.1:8000/';
  blogId:number = 0;
  check:number = 0;

  replyForm!: FormGroup;
  constructor (
    private _fb: FormBuilder
  ) {
    this.replyForm = this._fb.group({
      content : "",
      post_id : "",
      user_id : "",
    })
  }
  ngOnInit(): void {

  }

  submitReply(): void {

  }
}
