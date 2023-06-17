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
import { Entity } from "./Entity.js";
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(pos, size, parent, stroke, fill) {
        var _this = _super.call(this, pos, size, parent) || this;
        _this.stroke = stroke || false;
        _this.fill = fill || false;
        _this.style = 'solid';
        _this.visible = false;
        return _this;
    }
    Square.prototype.render = function (ctx) {
        if (this.style == 'dashed') {
            ctx.setLineDash([5, 5]);
        }
        ctx.beginPath();
        ctx.rect(this.position.world.x, this.position.world.y, this.size.w, this.size.h);
        if (this.stroke) {
            ctx.strokeStyle = this.stroke;
            ctx.stroke();
        }
        if (this.fill) {
            ctx.fillStyle = this.fill;
            ctx.fill();
        }
        ;
        ctx.setLineDash([]);
    };
    return Square;
}(Entity));
export { Square };
//# sourceMappingURL=Square.js.map