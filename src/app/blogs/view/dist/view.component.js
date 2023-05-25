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
var ViewComponent = /** @class */ (function () {
    function ViewComponent(_blogsService, _router, _route) {
        this._blogsService = _blogsService;
        this._router = _router;
        this._route = _route;
        this.API = 'http://127.0.0.1:8000/';
        this.blogId = 0;
    }
    ViewComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    ViewComponent.prototype.getData = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.blogId = params['id'];
        });
        this._blogsService.viewBlog(this.blogId).subscribe(function (data) {
            _this.data = data.data[1];
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
