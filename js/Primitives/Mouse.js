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
import { Vector, MouseState } from "../Types/types.js";
import { Circle } from "./Circle.js";
import { Entity } from "./Entity.js";
var Mouse = /** @class */ (function (_super) {
    __extends(Mouse, _super);
    function Mouse(canvas) {
        var _this = _super.call(this) || this;
        _this.lastPosition = Vector.zero();
        _this.state = MouseState.IDLE;
        _this.canvas = canvas;
        _this.actions = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
        };
        _this.deltaPosition = Vector.zero();
        _this.debugShape = new Circle(_this.position.world, 5, _this);
        _this.initListeners(_this.canvas);
        return _this;
    }
    Mouse.prototype.initListeners = function (canvas) {
        var _this = this;
        canvas.addEventListener('mousedown', function () {
            _this.state = MouseState.L_DOWN;
            _this.actions[MouseState.L_DOWN].forEach(function (func) {
                func();
            });
        });
        canvas.addEventListener('touchmove', function () {
            _this.state = MouseState.L_DOWN;
            _this.actions[MouseState.L_DOWN].forEach(function (action) {
                action();
            });
        }, { passive: false });
        canvas.addEventListener('dragstart', function (e) {
            e.preventDefault();
            _this.state = MouseState.L_DOWN;
            _this.actions[MouseState.L_DOWN].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('dragend', function () {
            _this.state = MouseState.L_UP;
            _this.actions[MouseState.L_UP].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('mouseleave', function () {
            _this.state = MouseState.L_UP;
            _this.actions[MouseState.L_UP].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('mouseup', function () {
            _this.state = MouseState.L_UP;
            _this.actions[MouseState.L_UP].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('mousemove', function (e) {
            console.log(_this.position.world);
            var rect = _this.canvas.getBoundingClientRect();
            _this.lastPosition = _this.lastPosition || _this.position;
            _this.setPosition(new Vector(e.clientX - rect.left, e.clientY - rect.top));
            requestAnimationFrame(function () {
                var deltaPosition = new Vector(_this.position.world.x - _this.lastPosition.x, _this.position.world.y - _this.lastPosition.y);
                _this.lastPosition = _this.position.world;
                _this.deltaPosition = deltaPosition;
            });
        });
    };
    Mouse.prototype.addAction = function (f, type) {
        this.actions[type].push(f);
    };
    return Mouse;
}(Entity));
export { Mouse };
//# sourceMappingURL=Mouse.js.map