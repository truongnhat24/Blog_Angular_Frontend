"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogsComponent = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var BlogsComponent = /** @class */ (function () {
    function BlogsComponent(_blogsService, _coreService) {
        this._blogsService = _blogsService;
        this._coreService = _coreService;
        this.title = "Blogs";
        this.API = 'http://127.0.0.1:8000/';
        this.user_id = 0;
    }
    BlogsComponent.prototype.ngOnInit = function () {
        this.access_token = localStorage.getItem('access_token');
        this.decoded = jwt_decode_1["default"](this.access_token);
        this.user_id = this.decoded.id;
        this.getBlogsList();
    };
    BlogsComponent.prototype.getBlogsList = function () {
        var _this = this;
        this._blogsService.getBlogsList(this.user_id).subscribe({
            next: function (res) {
                _this.data = res.data[0];
                console.log(_this.data);
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    BlogsComponent = __decorate([
        core_1.Component({
            selector: 'app-blogs',
            templateUrl: './blogs.component.html',
            styleUrls: ['./blogs.component.scss']
        })
    ], BlogsComponent);
    return BlogsComponent;
}());
exports.BlogsComponent = BlogsComponent;
