"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("wonder-commonlib/dist/commonjs/Log");
var Observer_1 = require("../core/Observer");
var Stream_1 = require("../core/Stream");
var contract_1 = require("../definition/typescript/decorator/contract");
var JudgeUtils_1 = require("../JudgeUtils");
var Operator_1 = require("../global/Operator");
var MergeAllObserver = (function (_super) {
    __extends(MergeAllObserver, _super);
    function MergeAllObserver(currentObserver, streamGroup, groupDisposable) {
        var _this = _super.call(this, null, null, null) || this;
        _this.done = false;
        _this.currentObserver = null;
        _this._streamGroup = null;
        _this._groupDisposable = null;
        _this.currentObserver = currentObserver;
        _this._streamGroup = streamGroup;
        _this._groupDisposable = groupDisposable;
        return _this;
    }
    MergeAllObserver.create = function (currentObserver, streamGroup, groupDisposable) {
        return new this(currentObserver, streamGroup, groupDisposable);
    };
    MergeAllObserver.prototype.onNext = function (innerSource) {
        if (JudgeUtils_1.JudgeUtils.isPromise(innerSource)) {
            innerSource = Operator_1.fromPromise(innerSource);
        }
        this._streamGroup.addChild(innerSource);
        this._groupDisposable.add(innerSource.buildStream(InnerObserver.create(this, this._streamGroup, innerSource)));
    };
    MergeAllObserver.prototype.onError = function (error) {
        this.currentObserver.error(error);
    };
    MergeAllObserver.prototype.onCompleted = function () {
        this.done = true;
        if (this._streamGroup.getCount() === 0) {
            this.currentObserver.completed();
        }
    };
    return MergeAllObserver;
}(Observer_1.Observer));
__decorate([
    contract_1.requireCheck(function (innerSource) {
        contract_1.assert(innerSource instanceof Stream_1.Stream || JudgeUtils_1.JudgeUtils.isPromise(innerSource), Log_1.Log.info.FUNC_MUST_BE("innerSource", "Stream or Promise"));
    })
], MergeAllObserver.prototype, "onNext", null);
exports.MergeAllObserver = MergeAllObserver;
var InnerObserver = (function (_super) {
    __extends(InnerObserver, _super);
    function InnerObserver(parent, streamGroup, currentStream) {
        var _this = _super.call(this, null, null, null) || this;
        _this._parent = null;
        _this._streamGroup = null;
        _this._currentStream = null;
        _this._parent = parent;
        _this._streamGroup = streamGroup;
        _this._currentStream = currentStream;
        return _this;
    }
    InnerObserver.create = function (parent, streamGroup, currentStream) {
        var obj = new this(parent, streamGroup, currentStream);
        return obj;
    };
    InnerObserver.prototype.onNext = function (value) {
        this._parent.currentObserver.next(value);
    };
    InnerObserver.prototype.onError = function (error) {
        this._parent.currentObserver.error(error);
    };
    InnerObserver.prototype.onCompleted = function () {
        var currentStream = this._currentStream, parent = this._parent;
        this._streamGroup.removeChild(function (stream) {
            return JudgeUtils_1.JudgeUtils.isEqual(stream, currentStream);
        });
        if (this._isAsync() && this._streamGroup.getCount() === 0) {
            parent.currentObserver.completed();
        }
    };
    InnerObserver.prototype._isAsync = function () {
        return this._parent.done;
    };
    return InnerObserver;
}(Observer_1.Observer));
//# sourceMappingURL=MergeAllObserver.js.map