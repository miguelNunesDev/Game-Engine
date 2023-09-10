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
    function Circle(position, radius, parent, _stroke, _fill) {
        if (_stroke === void 0) { _stroke = 'white'; }
        if (_fill === void 0) { _fill = 'white'; }
        var _this = _super.call(this, position, new Size(radius * 2), 0, parent) || this;
        _this._stroke = _stroke;
        _this._fill = _fill;
        _this._radius = radius;
        _this.visible = false;
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
    Circle.prototype.render = function (ctx) {
        var arcPos = Vector.add(this.transform.position, this._radius);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(arcPos.x, arcPos.y, this._radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this._stroke;
        ctx.fillStyle = this._fill;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };
    return Circle;
}(Entity));
export { Circle };
