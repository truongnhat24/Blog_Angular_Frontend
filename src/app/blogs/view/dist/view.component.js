"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var ViewComponent = /** @class */ (function () {
    function ViewComponent(_blogsService, _likeService, _router, _route) {
        this._blogsService = _blogsService;
        this._likeService = _likeService;
        this._router = _router;
        this._route = _route;
        this.API = 'http://127.0.0.1:8000/';
        this.check = 0;
        this.blogId = 0;
    }
    ViewComponent.prototype.ngOnInit = function () {
        this.getData();
        this.check = this.checkUser();
    };
    ViewComponent.prototype.getData = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.blogId = params['id'];
        });
        this._blogsService.viewBlog(this.blogId).subscribe(function (data) {
            _this.data = data.data[0];
            console.log(_this.data);
        });
    };
    ViewComponent.prototype.checkUser = function () {
        var access_token = localStorage.getItem('access_token');
        var decoded = jwt_decode_1["default"](access_token);
        var user_id = decoded.id;
        return user_id;
    };
    ViewComponent.prototype.likeSubmit = function (blgId, type, value) {
        var like = Number(value.children[1].innerHTML);
        var likeForm = {
            type_id: blgId,
            type: type
        };
        this._likeService.addLike(likeForm).subscribe({
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
    ViewComponent = __decorate([
        core_1.Component({
            selector: 'app-view',
            templateUrl: './view.component.html',
            styleUrls: ['./view.component.scss']
        })
    ], ViewComponent);
    return ViewComponent;
}());
exports.ViewComponent = ViewComponent;
