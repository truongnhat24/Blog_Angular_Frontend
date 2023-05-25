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
var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(_fb, _commentsService, _coreService, _router, _route) {
        this._fb = _fb;
        this._commentsService = _commentsService;
        this._coreService = _coreService;
        this._router = _router;
        this._route = _route;
        this.API = 'http://127.0.0.1:8000/';
        this.blogId = 0;
        this.check = 0;
        this.showReplyForm = false;
        this.addCommentForm = this._fb.group({
            content: '',
            post_id: ''
        }),
            this.replyForm = this._fb.group({
                content: "",
                post_id: "",
                user_id: ""
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
            _this.datas = data;
            console.log(_this.datas);
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
