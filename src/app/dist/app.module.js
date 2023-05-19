"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var animations_1 = require("@angular/platform-browser/animations");
var register_component_1 = require("./register/register.component");
var toolbar_1 = require("@angular/material/toolbar");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
var radio_1 = require("@angular/material/radio");
var select_1 = require("@angular/material/select");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var snack_bar_1 = require("@angular/material/snack-bar");
var blogs_component_1 = require("./blogs/blogs.component");
var header_component_1 = require("./shared/header/header.component");
var home_component_1 = require("./home/home.component");
var add_component_1 = require("./blogs/add/add.component");
var forms_2 = require("@angular/forms");
var angular_jwt_1 = require("@auth0/angular-jwt");
var auth_service_1 = require("./services/auth.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                blogs_component_1.BlogsComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                add_component_1.AddComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                datepicker_1.MatDatepickerModule,
                core_2.MatNativeDateModule,
                radio_1.MatRadioModule,
                select_1.MatSelectModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                sort_1.MatSortModule,
                snack_bar_1.MatSnackBarModule,
                forms_2.FormsModule,
            ],
            providers: [
                { provide: angular_jwt_1.JWT_OPTIONS, useValue: angular_jwt_1.JWT_OPTIONS },
                angular_jwt_1.JwtHelperService,
                auth_service_1.AuthService,
                {
                    provide: dialog_1.MatDialogRef,
                    useValue: {}
                },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
