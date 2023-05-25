"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReplyComponent = void 0;
var core_1 = require("@angular/core");
var ReplyComponent = /** @class */ (function () {
    function ReplyComponent(_fb) {
        this._fb = _fb;
        this.API = 'http://127.0.0.1:8000/';
        this.blogId = 0;
        this.check = 0;
        this.replyForm = this._fb.group({
            content: "",
            post_id: "",
            user_id: ""
        });
    }
    ReplyComponent.prototype.ngOnInit = function () {
    };
    ReplyComponent.prototype.submitReply = function () {
    };
    ReplyComponent = __decorate([
        core_1.Component({
            selector: 'app-reply',
            templateUrl: './reply.component.html',
            styleUrls: ['./reply.component.scss']
        })
    ], ReplyComponent);
    return ReplyComponent;
}());
exports.ReplyComponent = ReplyComponent;
