"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavigateLoggedIn = exports.AuthGuardService = exports.AuthCheckerService = void 0;
var core_1 = require("@angular/core");
var AuthCheckerService = /** @class */ (function () {
    function AuthCheckerService(jwtHelper) {
        this.jwtHelper = jwtHelper;
    }
    AuthCheckerService.prototype.isAuthenticated = function () {
        var accessToken = localStorage.getItem('access_token');
        return !this.jwtHelper.isTokenExpired(accessToken);
    };
    AuthCheckerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthCheckerService);
    return AuthCheckerService;
}());
exports.AuthCheckerService = AuthCheckerService;
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function () {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    };
    AuthGuardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
var NavigateLoggedIn = /** @class */ (function () {
    function NavigateLoggedIn(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    NavigateLoggedIn.prototype.canActivate = function () {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    };
    NavigateLoggedIn = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], NavigateLoggedIn);
    return NavigateLoggedIn;
}());
exports.NavigateLoggedIn = NavigateLoggedIn;
