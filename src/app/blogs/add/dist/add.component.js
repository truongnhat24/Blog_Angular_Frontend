"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddComponent = void 0;
var core_1 = require("@angular/core");
var ngx_editor_1 = require("ngx-editor");
var AddComponent = /** @class */ (function () {
    function AddComponent(_fb, _blogsService, _coreService, _router, _getInfo, _http) {
        this._fb = _fb;
        this._blogsService = _blogsService;
        this._coreService = _coreService;
        this._router = _router;
        this._getInfo = _getInfo;
        this._http = _http;
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
        this.base64Image = '';
        this.inputFile = false;
        this.reader = new FileReader();
        this.addBlogForm = this._fb.group({
            title: '',
            content: '',
            user_id: '',
            image: ['']
        });
    }
    AddComponent.prototype.ngOnInit = function () {
        this.addBlogForm.patchValue({});
        this.editor = new ngx_editor_1.Editor();
    };
    AddComponent.prototype.ngOnDestroy = function () {
        this.editor.destroy();
    };
    AddComponent.prototype.selectFiles = function (event) {
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
    };
    AddComponent.prototype.onAddSubmit = function () {
        var _this = this;
        if (this.addBlogForm.valid) {
            //console.log(this.base64Image);
            var formData = new FormData();
            formData.append('title', this.addBlogForm.value.title);
            formData.append('content', this.addBlogForm.value.content);
            formData.append('image', this.base64Image);
            formData.append('user_id', this._getInfo.getAuth().id);
            //debugger
            this._blogsService.addBlog(formData).subscribe({
                next: function (val) {
                    _this._coreService.openSnackBar('Blog added successfully');
                    _this._router.navigate(['blogs']);
                },
                error: function (err) { return console.log(err); }
            });
        }
    };
    AddComponent = __decorate([
        core_1.Component({
            selector: 'app-add',
            templateUrl: './add.component.html',
            styleUrls: ['./add.component.scss']
        })
    ], AddComponent);
    return AddComponent;
}());
exports.AddComponent = AddComponent;
