"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogsService = void 0;
var core_1 = require("@angular/core");
var BlogsService = /** @class */ (function () {
    function BlogsService(_http, _fileUS) {
        this._http = _http;
        this._fileUS = _fileUS;
        this.APIurl = 'http://127.0.0.1:8000/api';
    }
    // async addBlog(data: any): Promise<Observable<any>> {
    //   this._fileUS.upload(data.file);
    //   return this._http.post('http://localhost:3000/blogs', data)
    // }
    BlogsService.prototype.addBlog = function (data) {
        return this._http.post(this.APIurl + '/posts', data);
    };
    BlogsService.prototype.updateBlog = function (id, data) {
        return this._http.patch(this.APIurl + ("/posts/" + id), data);
    };
    BlogsService.prototype.getBlogsList = function (id) {
        return this._http.get(this.APIurl + ("/posts/index/" + id));
    };
    BlogsService.prototype.deleteBlog = function (id) {
        return this._http["delete"](this.APIurl + ("/posts/" + id));
    };
    BlogsService.prototype.viewBlog = function (id) {
        return this._http.get(this.APIurl + ("/posts/" + id));
    };
    BlogsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BlogsService);
    return BlogsService;
}());
exports.BlogsService = BlogsService;
