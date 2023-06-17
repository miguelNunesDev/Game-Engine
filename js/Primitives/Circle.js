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
    function Circle(center, radius, parent, stroke, fill) {
        if (parent === void 0) { parent = false; }
        if (stroke === void 0) { stroke = 'white'; }
        if (fill === void 0) { fill = 'white'; }
        var _this = this;
        var pos = Vector.sub(center, radius);
        var size = new Size(radius * 2);
        _this = _super.call(this, pos, size, parent) || this;
        _this._radius = radius;
        _this._fill = fill;
        _this._stroke = stroke;
        _this.visible = false;
        return _this;
    }
    Object.defineProperty(Circle.prototype, "size", {
        set: function (size) {
            this._size = size;
            this._radius = size.w * 0.5;
        },
        enumerable: false,
        configurable: true
    });
    Circle.prototype.render = function (ctx) {
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this._center.x, this._center.y, this._radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this._stroke;
        ctx.fillStyle = this._fill;
        ctx.fill();
        ctx.stroke();
    };
    return Circle;
}(Entity));
export { Circle };
//# sourceMappingURL=Circle.js.map