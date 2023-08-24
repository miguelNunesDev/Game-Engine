import { World } from "../Primitives/World.js";
import { Vector } from "../Types/types.js";
var Containable = /** @class */ (function () {
    function Containable(_entity, _parent, _childs) {
        if (_parent === void 0) { _parent = World.getInstance(); }
        if (_childs === void 0) { _childs = new Map(); }
        var _this = this;
        var _a;
        this._entity = _entity;
        this._parent = _parent;
        this._childs = _childs;
        this.moveChilds = function (pos) {
            var _a, _b;
            if (!((_a = _this._entity) === null || _a === void 0 ? void 0 : _a.transform))
                return;
            var delta = Vector.sub(pos, _this._entity.transform.position);
            (_b = _this._childs) === null || _b === void 0 ? void 0 : _b.forEach(function (child) {
                if (!child || !child.transform)
                    return;
                child.transform.position = Vector.add(child.transform.position, delta);
            });
        };
        (_a = this._parent) === null || _a === void 0 ? void 0 : _a.container.addChild(this._entity);
        this.setChildsTransformListeners();
    }
    Containable.prototype.setChildsTransformListeners = function () {
        var _a;
        (_a = this._entity) === null || _a === void 0 ? void 0 : _a.transform.on(this.moveChilds, 'position');
    };
    Object.defineProperty(Containable.prototype, "parent", {
        get: function () { return this._parent; },
        set: function (parent) { this._parent = parent; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Containable.prototype, "childs", {
        get: function () { return this._childs; },
        set: function (childs) {
            var _this = this;
            this._childs = childs;
            this._childs.forEach(function (child) { child.container.parent = _this._entity; });
        },
        enumerable: false,
        configurable: true
    });
    ;
    Containable.prototype.addChild = function (child) {
        var key = this._childs.size;
        this._childs.set(key, child);
        return key;
    };
    Containable.prototype.getChild = function (id) {
        return this.childs.get(id);
    };
    Containable.prototype.setChild = function (id, child) {
        this._childs.set(id, child);
    };
    Containable.prototype.setChildsVisibility = function (bol) {
        if (!this._childs)
            return;
        this._childs.forEach(function (child) {
            if (!child.visibility)
                return;
            child.visibility = bol;
        });
    };
    Containable.prototype.setChildsPositions = function (pos) {
        this._childs.forEach(function (child) {
            if (!child.transform)
                return;
            child.transform.localPosition = pos;
        });
    };
    return Containable;
}());
export { Containable };
