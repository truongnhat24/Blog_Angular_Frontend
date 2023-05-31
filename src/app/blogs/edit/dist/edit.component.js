"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditComponent = void 0;
var core_1 = require("@angular/core");
var ngx_editor_1 = require("ngx-editor");
var EditComponent = /** @class */ (function () {
    function EditComponent(_fb, _blogsService, _coreService, _router, _getInfo, _http, _route) {
        var _a, _b, _c;
        this._fb = _fb;
        this._blogsService = _blogsService;
        this._coreService = _coreService;
        this._router = _router;
        this._getInfo = _getInfo;
        this._http = _http;
        this._route = _route;
        this.toolbar = [
            ['bold', 'italic'],
            ['underline', 'strike'],
            ['code', 'blockquote'],
            ['ordered_list', 'bullet_list'],
            [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
            ['link', 'image'],
            ['text_color', 'background_color'],
            ['align_left', 'align_center', 'align_right', 'align_justify'],
        ];
        this.urllink = "assets/img/avatar.svg";
        this.API = 'http://127.0.0.1:8000/';
        this.base64Image = '';
        this.inputFile = false;
        this.reader = new FileReader();
        this.blogId = 0;
        this.editBlogForm = this._fb.group({
            title: (_a = this.data) === null || _a === void 0 ? void 0 : _a.title,
            content: (_b = this.data) === null || _b === void 0 ? void 0 : _b.content,
            image: (_c = this.data) === null || _c === void 0 ? void 0 : _c.image
        });
    }
    EditComponent.prototype.ngOnInit = function () {
        this.getData();
        this.editBlogForm.patchValue({});
        this.editor = new ngx_editor_1.Editor();
    };
    EditComponent.prototype.ngOnDestroy = function () {
        this.editor.destroy();
    };
    EditComponent.prototype.getData = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.blogId = params['id'];
        });
        this._blogsService.viewBlog(this.blogId).subscribe(function (data) {
            _this.data = data.data[0];
        });
    };
    EditComponent.prototype.selectFiles = function (event, value) {
        var _this = this;
        this.inputFile = true;
        var file = event.target.files[0];
        this.files = event.target.files[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(file);
            reader_1.onload = function () {
                _this.base64Image = reader_1.result;
            };
        }
        value.style.display = "none";
    };
    EditComponent.prototype.onEditSubmit = function (id) {
        var _this = this;
        if (this.editBlogForm.valid) {
            if (this.editBlogForm.value.image == null) {
                delete this.editBlogForm.value.image;
            }
            else {
                this.editBlogForm.value.image = this.base64Image;
            }
            this._blogsService.updateBlog(id, this.editBlogForm.value).subscribe({
                next: function (val) {
                    _this._coreService.openSnackBar('Blog edited successfully');
                    _this._router.navigate(['blogs']);
                },
                error: function (err) { return console.log(err); }
            });
        }
    };
    EditComponent = __decorate([
        core_1.Component({
            selector: 'app-edit',
            templateUrl: './edit.component.html',
            styleUrls: ['./edit.component.scss']
        })
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
