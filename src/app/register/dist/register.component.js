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
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var login_component_1 = require("../login/login.component");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_fb, _userService, _coreService, _dialog, _dialogRef, data) {
        this._fb = _fb;
        this._userService = _userService;
        this._coreService = _coreService;
        this._dialog = _dialog;
        this._dialogRef = _dialogRef;
        this.data = data;
        this.hide = true;
        this.resForm = this._fb.group({
            name: this._fb.control('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3)])),
            email: this._fb.control('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])),
            password: this._fb.control('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])),
            phone: this._fb.control('', forms_1.Validators.minLength(10)),
            role: this._fb.control('0'),
            status: this._fb.control('1')
        });
    }
    // password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    RegisterComponent.prototype.ngOnInit = function () {
        this.resForm.patchValue({});
    };
    RegisterComponent.prototype.onResFormSubmit = function () {
        var _this = this;
        if (this.resForm.valid) {
            console.log(this.resForm.value);
            this._userService.addUser(this.resForm.value).subscribe({
                next: function (val) {
                    _this._coreService.openSnackBar("Register successfully");
                    _this._dialogRef.close(true);
                    _this._dialog.open(login_component_1.LoginComponent);
                },
                error: function (err) {
                    _this._coreService.openSnackBar("Register failed");
                    console.error(err);
                }
            });
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        __param(5, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
