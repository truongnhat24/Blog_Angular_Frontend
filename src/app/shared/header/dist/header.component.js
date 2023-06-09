"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var register_component_1 = require("src/app/register/register.component");
var login_component_1 = require("src/app/login/login.component");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_dialog, _router, _coreService, _auth, _userService) {
        this._dialog = _dialog;
        this._router = _router;
        this._coreService = _coreService;
        this._auth = _auth;
        this._userService = _userService;
        this.title = 'blogAngular';
        this.API = 'http://127.0.0.1:8000/';
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    HeaderComponent.prototype.getUser = function () {
        var _this = this;
        if (this.checkAuth()) {
            this._userService.getUser().subscribe(function (data) {
                _this.user = data.data[0];
                console.log(_this.user);
            });
        }
    };
    HeaderComponent.prototype.openRegisterForm = function () {
        var dialogRef = this._dialog.open(register_component_1.RegisterComponent);
        return dialogRef;
    };
    HeaderComponent.prototype.openLoginForm = function () {
        var _this = this;
        var dialogRef = this._dialog.open(login_component_1.LoginComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.getUser();
            }
        });
        return dialogRef;
    };
    HeaderComponent.prototype.checkAuth = function () {
        var ss = localStorage.getItem('access_token');
        if (ss != null && this._auth.isAuthenticated()) {
            return true;
        }
        else {
            return false;
        }
    };
    HeaderComponent.prototype.onLogOut = function () {
        window.localStorage.clear();
        this.user = null;
        this._coreService.openSnackBar("Logout successfully!");
        this._router.navigate(['']);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
