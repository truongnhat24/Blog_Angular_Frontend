"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(
    //private store: Store<ApplicationState>, 
    router) {
        this.router = router;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(operators_1.catchError(function (err) {
            var _a;
            if ([401, 403].includes(err.status)) {
                //this.store.dispatch(new LogoutAction());
                _this.router.navigate(['/login']);
            }
            var error = ((_a = err.error) === null || _a === void 0 ? void 0 : _a.message) || err.statusText;
            return rxjs_1.throwError(function () { return error; });
        }));
    };
    ErrorInterceptor = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());
exports.ErrorInterceptor = ErrorInterceptor;
