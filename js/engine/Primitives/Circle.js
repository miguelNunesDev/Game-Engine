var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Size, Vector } from "../Types/types.js";
import { Entity } from "./Entity.js";
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, radius, _style, parent) {
        var _this = _super.call(this, { position: new Vector(x, y !== null && y !== void 0 ? y : x), size: new Size(radius * 2), rotation: 0 }, parent) || this;
        _this._style = _style;
        _this._radius = radius;
        _this.visible = true;
        return _this;
    }
    Object.defineProperty(Circle.prototype, "size", {
        set: function (size) {
            this.transform.size = size;
            this._radius = size.w * 0.5;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Circle.prototype, "radius", {
        get: function () { return this._radius; },
        set: function (r) {
            this._radius = r;
            this.transform.size = new Size(r * 2);
        },
        enumerable: false,
        configurable: true
    });
    Circle.prototype.render = function (ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        var arcPos = Vector.add(this.transform.position, this._radius);
        ctx.save();
        ctx.beginPath();
        ctx.arc(arcPos.x, arcPos.y, this._radius, 0, 2 * Math.PI);
        // Fill
        ctx.globalAlpha = ((_b = (_a = this._style) === null || _a === void 0 ? void 0 : _a.fill) === null || _b === void 0 ? void 0 : _b[1]) || ((_c = this._style) === null || _c === void 0 ? void 0 : _c.opacity) || 1;
        ctx.fillStyle = ((_e = (_d = this._style) === null || _d === void 0 ? void 0 : _d.fill) === null || _e === void 0 ? void 0 : _e[0]) || '';
        ctx.fill();
        ctx.globalAlpha = ((_g = (_f = this._style) === null || _f === void 0 ? void 0 : _f.stroke) === null || _g === void 0 ? void 0 : _g[2]) || ((_h = this._style) === null || _h === void 0 ? void 0 : _h.opacity) || 1;
        ctx.strokeStyle = ((_k = (_j = this._style) === null || _j === void 0 ? void 0 : _j.stroke) === null || _k === void 0 ? void 0 : _k[0]) || ((_m = (_l = this._style) === null || _l === void 0 ? void 0 : _l.fill) === null || _m === void 0 ? void 0 : _m[0]);
        ctx.lineWidth = ((_p = (_o = this._style) === null || _o === void 0 ? void 0 : _o.stroke) === null || _p === void 0 ? void 0 : _p[1]) || 0;
        ctx.stroke();
        ctx.restore();
    };
    return Circle;
}(Entity));
export { Circle };
