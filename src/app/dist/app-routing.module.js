"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var blogs_component_1 = require("./blogs/blogs.component");
var home_component_1 = require("./home/home.component");
var add_component_1 = require("./blogs/add/add.component");
var auth_guard_guard_1 = require("./auth-guard.guard");
var view_component_1 = require("./blogs/view/view.component");
var delete_component_1 = require("./blogs/delete/delete.component");
var edit_component_1 = require("./blogs/edit/edit.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'blogs',
        canActivate: [auth_guard_guard_1.AuthGuardGuard],
        children: [
            { path: '', component: blogs_component_1.BlogsComponent },
            { path: 'add', component: add_component_1.AddComponent },
            { path: 'view/:id', component: view_component_1.ViewComponent },
            { path: 'edit/:id', component: edit_component_1.EditComponent },
            { path: 'delete/:id', component: delete_component_1.DeleteComponent }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
