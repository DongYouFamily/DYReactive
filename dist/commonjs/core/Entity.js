"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = (function () {
    function Entity(uidPre) {
        this._uid = null;
        this._uid = uidPre + String(Entity.UID++);
    }
    Object.defineProperty(Entity.prototype, "uid", {
        get: function () {
            return this._uid;
        },
        set: function (uid) {
            this._uid = uid;
        },
        enumerable: true,
        configurable: true
    });
    return Entity;
}());
Entity.UID = 1;
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map