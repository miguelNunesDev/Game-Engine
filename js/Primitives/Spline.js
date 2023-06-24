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
import { lerpLine, lerp } from "../Helper.js";
import { ActionState, Size, Vector } from "../Types/types.js";
import { Line } from "./Line.js";
import { Entity } from "./Entity.js";
import { Handler } from "../Handler.js";
import { DebugManager } from "../Managers/DebugManager.js";
// TODO: MAS ROTO QUE MIS SUEÑOS Y ESPERANZAS
var Spline = /** @class */ (function (_super) {
    __extends(Spline, _super);
    function Spline(from, to, type) {
        if (type === void 0) { type = 'bezier'; }
        var _this = this;
        var line = new Line(from, to);
        _this = _super.call(this, line.position.world, line.size) || this;
        _this.line = line;
        _this.line.parent = _this;
        _this.handler = new Handler(_this.center, new Size(15), _this, 'square', 'purple');
        _this.weightHandler = {
            left: new Handler(Vector.zero(), new Size(10), _this.handler, 'circle', 'blue'),
            right: new Handler(Vector.zero(), new Size(10), _this.handler, 'circle', 'blue')
        };
        _this.weightHandler.left.on(ActionState.HOVER, function () {
        });
        _this.weightHandler.right.on(ActionState.HOVER, function () {
        });
        _this.type = type;
        _this.drawType = {
            cuadratic: _this.drawCuadratic,
            cubic: _this.drawCubic,
            curve: _this.drawCurve
        };
        _this.sections = [];
        if (_this.type === 'curve') {
            _this.sections.push(new Line(_this.line.pi, _this.line.center, false, _this, 'purple'));
            _this.sections.push(new Line(_this.line.center, _this.line.pf, false, _this, 'brown'));
            _this.weightHandler.left.setPosition(lerpLine(_this.sections[0], 0.5));
            _this.weightHandler.right.setPosition(lerpLine(_this.sections[1], 0.5));
            _this.sections[0].visible = false;
            _this.sections[1].visible = false;
        }
        _this.handler.on(ActionState.CLICKED, function () {
            _this.sections[0].pf = _this.handler.center;
            _this.sections[1].pi = _this.handler.center;
        });
        return _this;
    }
    Spline.prototype.drawCubic = function (ctx, color) {
        if (color === void 0) { color = 'black'; }
        // const leftLine = {
        //     from: this.line.pi,
        //     to: this.handler.center
        // };
        // const rigthLine = {
        //     from: this.handler.center,
        //     to: this.line.pf
        // }
        // ctx.beginPath();
        // for (let i = 0; i < 1; i += 0.01) {
        //     const left_t = lerpLine(leftLine, i);
        //     const right_t = lerpLine(rigthLine, i);
        //     const middleLine = {
        //         from: left_t,
        //         to: right_t
        //     }
        //     const middle_t = lerpLine(middleLine, i);
        //     ctx.lineTo(middle_t.x, middle_t.y);
        //     ctx.moveTo(middle_t.x, middle_t.y);
        // }
        // ctx.strokeStyle = color;
        // ctx.stroke();
    };
    Spline.prototype.drawCuadratic = function (ctx, color, _line, handler) {
        if (color === void 0) { color = 'black'; }
        var line = _line;
        var debug = DebugManager.getInstance();
        // line.center = lerpLine(line, 0.5)
        var point1 = lerp(new Vector(line.pi.x, handler.position.world.y), handler.position.world, 0.5);
        var point2 = lerp(handler.position.world, new Vector(line.center.x, handler.position.world.y), 0.5);
        debug.line(line.pi, point1, 'green');
        debug.line(point1, point2, 'red');
        debug.line(point2, line.pf, 'black');
        // B - C + (B - C * 0.5)
        ctx.beginPath();
        // ctx.moveTo(line.pi.x, line.pf.y);
        for (var i = 0; i < 1; i += 0.01) {
            var tA = lerp(line.pi, point1, i);
            var tB = lerp(point1, point2, i);
            var tC = lerp(point2, line.pf, i);
            var tD = lerp(tA, tB, i);
            var tE = lerp(tB, tC, i);
            var tFinal = lerp(tD, tE, i);
            ctx.lineTo(tFinal.x, tFinal.y);
            ctx.moveTo(tFinal.x, tFinal.y);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
        return line.center;
    };
    Spline.prototype.drawCurve = function (ctx, color) {
        if (color === void 0) { color = 'black'; }
        this.drawCuadratic(ctx, 'blue', this.sections[0], this.weightHandler.left);
        this.drawCuadratic(ctx, 'red', this.sections[1], this.weightHandler.right);
    };
    Spline.prototype.draw = function (ctx) {
        this.drawType[this.type].bind(this)(ctx, 'black');
    };
    Spline.prototype.render = function (ctx) {
        this.draw(ctx);
        // this.debugCubic(ctx);
    };
    return Spline;
}(Entity));
export { Spline };
