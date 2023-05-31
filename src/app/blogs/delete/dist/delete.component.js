"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DeleteComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var DeleteComponent = /** @class */ (function () {
    function DeleteComponent(data, _router, _route, _blogsService, _coreService, _dialogRef) {
        this.data = data;
        this._router = _router;
        this._route = _route;
        this._blogsService = _blogsService;
        this._coreService = _coreService;
        this._dialogRef = _dialogRef;
        this.blogId = 0;
    }
    DeleteComponent.prototype.ngOnInit = function () {
        this.blogId = this.data.blogId;
    };
    DeleteComponent.prototype.deleteBlog = function () {
        var _this = this;
        this._blogsService.deleteBlog(this.blogId).subscribe({
            next: function (res) {
                _this._coreService.openSnackBar('Blog deleted successfully');
                _this._dialogRef.close(true);
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    DeleteComponent = __decorate([
        core_1.Component({
            selector: 'app-delete',
            templateUrl: './delete.component.html',
            styleUrls: ['./delete.component.scss']
        }),
        __param(0, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DeleteComponent);
    return DeleteComponent;
}());
exports.DeleteComponent = DeleteComponent;
