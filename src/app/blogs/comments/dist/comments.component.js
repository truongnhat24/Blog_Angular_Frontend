"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentsComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var rxjs_1 = require("rxjs");
var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(_fb, _commentsService, _likeService, _coreService, _router, _route) {
        this._fb = _fb;
        this._commentsService = _commentsService;
        this._likeService = _likeService;
        this._coreService = _coreService;
        this._router = _router;
        this._route = _route;
        this.API = 'http://127.0.0.1:8000/';
        this.blogId = 0;
        this.check = 0;
        this.checkOn = false;
        this.checkEditOn = false;
        this.showReplyForm = false;
        this.showEditForm = false;
        this.addCommentForm = this._fb.group({
            content: '',
            post_id: ''
        }),
            this.replyForm = this._fb.group({
                content: "",
                post_id: ""
            }),
            this.editForm = this._fb.group({
                content: ''
            });
    }
    CommentsComponent.prototype.ngOnInit = function () {
        this.loadComment();
        this.check = this.checkUser();
    };
    CommentsComponent.prototype.loadComment = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.blogId = params['id'];
        });
        this._commentsService.getCommentsList(this.blogId).subscribe(function (data) {
            _this.datas = data.data[1];
            _this.datas.map(function (data) {
                data.likeOn = false;
            });
            var likeCheck = data.data[0];
            _this.datas.map(function (data) {
                likeCheck.map(function (check) {
                    if (check != rxjs_1.EMPTY && data.user_id == check.user_id && data.id == check.type_id) {
                        data.likeOn = true;
                    }
                });
            });
        });
    };
    CommentsComponent.prototype.checkUser = function () {
        var access_token = localStorage.getItem('access_token');
        var decoded = jwt_decode_1["default"](access_token);
        var user_id = decoded.id;
        return user_id;
    };
    CommentsComponent.prototype.onCommentSubmit = function () {
        var _this = this;
        if (this.addCommentForm.valid) {
            var formData = new FormData();
            formData.append('content', this.addCommentForm.value.content);
            formData.append('post_id', this.blogId.toString());
            this._commentsService.addComment(formData).subscribe({
                next: function (val) {
                    _this._coreService.openSnackBar('Blog added successfully');
                    _this.loadComment();
                    _this.addCommentForm.reset();
                },
                error: function (err) { return console.log(err); }
            });
        }
    };
    CommentsComponent.prototype.onDelSubmit = function (commentId) {
        var _this = this;
        this._commentsService.deleteComment(commentId).subscribe({
            next: function (res) {
                _this._coreService.openSnackBar('Comment deleted successfully');
                _this.loadComment();
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    CommentsComponent.prototype.showReplyFormClick = function (cmtId) {
        var _this = this;
        this.showReplyForm = !this.showReplyForm;
        this.datas.map(function (data) {
            data.checkOn = (data.id == cmtId) ? ((_this.showReplyForm == true) ? true : false)
                : (data.checkOn = false);
            // if (data.id == cmtId){
            //   data.checkOn = (this.showReplyForm == true) ? true : false;
            // } else {
            //   data.checkOn = false;
            // }
        });
    };
    CommentsComponent.prototype.showEditFormClick = function (cmtId, cmtCont) {
        var _this = this;
        this.showEditForm = !this.showEditForm;
        this.hisComment = cmtCont;
        this.datas.map(function (data) {
            data.checkEditOn = (data.id == cmtId) ? ((_this.showEditForm == true) ? true : false)
                : (data.checkEditOn = false);
        });
    };
    CommentsComponent.prototype.submitReply = function (cmtId) {
        var _this = this;
        if (this.replyForm.valid) {
            var formData = new FormData();
            formData.append('content', this.replyForm.value.content);
            formData.append('post_id', this.blogId.toString());
            formData.append('cmtParent', cmtId.toString());
            this._commentsService.addComment(formData).subscribe({
                next: function (val) {
                    _this._coreService.openSnackBar('Comment reply added successfully');
                    _this.loadComment();
                    _this.showReplyForm = false;
                    _this.replyForm.reset();
                },
                error: function (err) { return console.log(err); }
            });
        }
    };
    CommentsComponent.prototype.submitEdit = function (cmtId) {
        var _this = this;
        if (this.editForm.valid) {
            this._commentsService.updateComment(cmtId, this.editForm.value).subscribe({
                next: function (val) {
                    _this._coreService.openSnackBar('Comment edited successfully');
                    _this.loadComment();
                    _this.showEditForm = false;
                    _this.editForm.reset();
                },
                error: function (err) { return console.log(err); }
            });
        }
    };
    CommentsComponent.prototype.likeSubmit = function (cmtId, type, value) {
        var like = Number(value.children[1].innerHTML);
        this._likeService.addLike(cmtId, type).subscribe({
            next: function () {
                if (value.firstChild.innerHTML == 'favorite') {
                    value.firstChild.innerHTML = "favorite_border";
                    value.children[1].innerHTML = like - 1;
                }
                else {
                    value.firstChild.innerHTML = "favorite";
                    value.children[1].innerHTML = like + 1;
                }
            },
            error: function (err) { return console.log(err); }
        });
    };
    __decorate([
        core_1.ViewChild('like_element')
    ], CommentsComponent.prototype, "likeElement");
    CommentsComponent = __decorate([
        core_1.Component({
            selector: 'app-comments',
            templateUrl: './comments.component.html',
            styleUrls: ['./comments.component.scss']
        })
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;
