import { Square } from "../Primitives/Square.js";
var DebugManager = /** @class */ (function () {
    function DebugManager(ctx) {
        this.ctx = ctx;
        this.queue = [];
    }
    DebugManager.getInstance = function (ctx) {
        if (ctx === void 0) { ctx = false; }
        if (!DebugManager._instance) {
            DebugManager._instance = new DebugManager(ctx);
        }
        return DebugManager._instance;
    };
    DebugManager.prototype.boundingBox = function (entity, color) {
        if (color === void 0) { color = 'gray'; }
        var box = new Square(entity.boundingBox.position, entity.boundingBox.size, entity, color);
        box.visible = false;
        box.style = 'dashed';
        this.queue.push(function (ctx) {
            box.render(ctx);
        });
    };
    DebugManager.prototype.line = function (pi, pf, color) {
        if (color === void 0) { color = 'gray'; }
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(pi.x, pi.y);
        this.ctx.lineTo(pf.x, pf.y);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.setLineDash([]);
    };
    DebugManager.prototype.render = function () {
        var _this = this;
        if (!this.queue.length)
            return;
        this.queue.forEach(function (cb) { cb(_this.ctx); });
    };
    return DebugManager;
}());
export { DebugManager };
//# sourceMappingURL=DebugManager.js.map