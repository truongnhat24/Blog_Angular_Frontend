"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = void 0;
var core_1 = require("@angular/core");
var UsersService = /** @class */ (function () {
    function UsersService(_http) {
        this._http = _http;
        this.APIurl = 'http://127.0.0.1:8000/api';
    }
    UsersService.prototype.addUser = function (data) {
        return this._http.post(this.APIurl + '/auth/register', data);
    };
    UsersService.prototype.login = function (data) {
        return this._http.post(this.APIurl + '/users/login', data);
    };
    UsersService.prototype.getUser = function () {
        return this._http.get(this.APIurl + '/users');
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
