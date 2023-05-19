"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthGuardGuard = void 0;
var core_1 = require("@angular/core");
var login_component_1 = require("./login/login.component");
var AuthGuardGuard = /** @class */ (function () {
    function AuthGuardGuard(auth, router, _dialog) {
        this.auth = auth;
        this.router = router;
        this._dialog = _dialog;
    }
    AuthGuardGuard.prototype.canActivate = function (route, state) {
        if (!this.auth.isAuthenticated()) {
            console.log("ccc");
            this._dialog.open(login_component_1.LoginComponent);
            return false;
        }
        return true;
    };
    AuthGuardGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthGuardGuard);
    return AuthGuardGuard;
}());
exports.AuthGuardGuard = AuthGuardGuard;
