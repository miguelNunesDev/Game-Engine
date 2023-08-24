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
import { abs, degToRad } from "../Helper.js";
import { Vector, Size } from "../Types/types.js";
import { Entity } from "./Entity.js";
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(p1, p2, angle, parent, color) {
        if (color === void 0) { color = 'gray'; }
        var _this = this;
        var pf = p2;
        if (!Vector.is(p2) && typeof angle !== "boolean") {
            var rad = degToRad(angle);
            pf = new Vector(p1.x + (Math.cos(rad) * p2), p1.y + (Math.sin(rad) * p2));
        }
        var pos = new Vector(p1.x < pf.x ? p1.x : pf.x, p1.y < pf.y ? p1.y : pf.y);
        var size = new Size(abs(pf.x - p1.x), abs(pf.y - p1.y));
        _this = _super.call(this, pos, size, angle, parent) || this;
        _this.color = color;
        _this.style = 'solid';
        _this._pi = p1;
        _this._pf = pf;
        return _this;
    }
    Object.defineProperty(Line.prototype, "pf", {
        get: function () { return this._pf; },
        set: function (pos) {
            var deltaPos = Vector.sub(this._pf, pos);
            this.transform.center = Vector.add(this.transform.center, deltaPos);
            this._pf = pos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "pi", {
        get: function () { return this._pi; },
        set: function (pos) {
            var deltaPos = Vector.sub(this._pi, pos);
            this.transform.center = Vector.add(this.transform.center, deltaPos);
            this._pi = pos;
        },
        enumerable: false,
        configurable: true
    });
    Line.prototype.setPosition = function (pos) {
        this.transform.position = pos;
        this._pi = pos;
        this._pf = new Vector(this._pi.x + this.transform.size.w, this._pi.y + this.transform.size.h);
    };
    Line.prototype.render = function (ctx) {
        if (this.style == 'dashed') {
            ctx.setLineDash([10, 10]);
        }
        ctx.beginPath();
        ctx.moveTo(this._pi.x, this._pi.y);
        ctx.lineTo(this._pf.x, this._pf.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.setLineDash([]);
    };
    return Line;
}(Entity));
export { Line };
