import { Transform } from "../Modules/Transform.js";
import { Square } from "../Primitives/Square.js";
import { UIText } from "../Primitives/UI.js";
import { Size, Vector } from "../Types/types.js";
var DebugManager = /** @class */ (function () {
    function DebugManager(ctx) {
        this.ctx = ctx;
        this._queue = new Map();
    }
    DebugManager.getInstance = function (ctx) {
        if (ctx === void 0) { ctx = false; }
        if (!DebugManager._instance) {
            DebugManager._instance = new DebugManager(ctx);
        }
        return DebugManager._instance;
    };
    DebugManager.prototype.transform = function (entity) {
        var box = new Square({ position: Vector.zero, size: entity.transform.size });
        box.style = 'dashed';
        box.stroke = 'gray';
        this._queue.set(entity.uid, {
            entity: entity,
            box: box,
            texts: [
                new UIText('', {}, { family: 'andale mono' }),
                new UIText('', {}, { family: 'andale mono' }),
            ]
        });
    };
    DebugManager.prototype.updateTransform = function (element) {
        var data = element.entity.transform.data;
        element.box.transform.position = data.position;
        var textTransform = {
            position: Vector.sub(data.position, new Vector(0, 12)),
            size: Size.add(data.size, 30)
        };
        this.setDebugText(element.texts[0], "pos(".concat(data.position.x, ",").concat(data.position.y, "); angle(").concat(data.rotation, ")"), textTransform, 'top-left');
        this.setDebugText(element.texts[1], "size(".concat(data.size.w, ",").concat(data.size.h, ")"), textTransform, 'bottom-left');
    };
    DebugManager.prototype.setDebugText = function (text, content, _transform, anchor) {
        var transform = new Transform(_transform);
        transform.anchor = anchor;
        text.transform.position = transform.anchor;
        text.content = content;
        text.toUppercase();
        text.transform.size = new Size(12);
        return text;
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
    DebugManager.prototype.update = function () {
        var _this = this;
        if (!this._queue.size)
            return;
        this._queue.forEach(function (el) {
            _this.updateTransform(el);
        });
    };
    return DebugManager;
}());
export { DebugManager };
