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
import { CollisionManager } from "../Managers/CollisionManager.js";
import { Vector, MouseState } from "../Types/types.js";
import { Circle } from "./Circle.js";
import { Entity } from "./Entity.js";
import { CameraManager } from "../Managers/CameraManager.js";
var Cursor = /** @class */ (function (_super) {
    __extends(Cursor, _super);
    function Cursor(canvas) {
        var _this = _super.call(this) || this;
        _this._collider = CollisionManager.getInstance();
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
            6: [],
            7: []
        };
        _this._targetID = false;
        _this.deltaPosition = Vector.zero();
        _this._absolutePosition = Vector.zero();
        _this.debugShape = new Circle(_this.position.world, 5, _this);
        _this.initListeners(_this.canvas);
        return _this;
    }
    Cursor.getInstance = function (canvas) {
        if (canvas === void 0) { canvas = false; }
        if (!Cursor._instance) {
            Cursor._instance = new Cursor(canvas);
        }
        return Cursor._instance;
    };
    Cursor.prototype.initListeners = function (canvas) {
        var _this = this;
        canvas.addEventListener('mousedown', function () {
            console.log('MOUSE DOWN');
            _this.state = MouseState.L_DOWN;
            if (!_this.actions[MouseState.L_DOWN].length)
                return;
            _this.actions[MouseState.L_DOWN].forEach(function (func) {
                func();
            });
        });
        canvas.addEventListener('touchstart', function (e) {
            _this.state = MouseState.L_DOWN;
            if (!_this.actions[MouseState.L_DOWN].length)
                return;
            _this.actions[MouseState.L_DOWN].forEach(function (func) {
                func();
            });
        }, { passive: false });
        // canvas.addEventListener('touchmove', () => {
        //     this.state = MouseState.DRAG;
        //     this.actions[MouseState.DRAG].forEach(action => {
        //         action();
        //     });
        // }, { passive: false })
        canvas.addEventListener('touchend', function () {
            _this.state = MouseState.L_UP;
            _this.actions[MouseState.L_UP].forEach(function (action) {
                action();
            });
        });
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
            _this.state = MouseState.LEAVE;
            if (!_this.actions[MouseState.LEAVE].length)
                return;
            _this.actions[MouseState.LEAVE].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('mouseup', function () {
            _this.state = MouseState.L_UP;
            if (!_this.actions[MouseState.L_UP].length)
                return;
            _this.actions[MouseState.L_UP].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('mousemove', function (e) {
            var rect = _this.canvas.getBoundingClientRect();
            var camera = CameraManager.getInstance().current;
            _this.lastPosition = _this.lastPosition || _this.position.world;
            _this._absolutePosition = new Vector(e.clientX - rect.left, e.clientY - rect.top);
            var localPosition = Vector.add(_this._absolutePosition, camera.position);
            requestAnimationFrame(function () {
                _this.deltaPosition = Vector.sub(localPosition, _this.lastPosition);
                _this.lastPosition = localPosition;
                _this.setPosition(localPosition);
            });
            if (!_this.actions[MouseState.MOVE].length)
                return;
            _this.actions[MouseState.MOVE].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('touchmove', function (e) {
            var rect = _this.canvas.getBoundingClientRect();
            var camera = CameraManager.getInstance().current;
            _this.lastPosition = _this.lastPosition || _this.position.world;
            _this._absolutePosition = new Vector(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
            var localPosition = Vector.add(_this._absolutePosition, camera.position);
            requestAnimationFrame(function () {
                _this.deltaPosition = Vector.sub(localPosition, _this.lastPosition);
                _this.lastPosition = localPosition;
                _this.setPosition(localPosition);
            });
            console.log(localPosition);
            if (!_this.actions[MouseState.MOVE].length)
                return;
            _this.actions[MouseState.MOVE].forEach(function (action) {
                action();
            });
        });
    };
    Cursor.prototype.on = function (type, f) {
        this.actions[type].push(f);
    };
    Object.defineProperty(Cursor.prototype, "targetID", {
        get: function () { return this._targetID; },
        enumerable: false,
        configurable: true
    });
    Cursor.prototype.onEntityClick = function (entity, f) {
        var _this = this;
        this._collider.listen(this, entity, function () {
            if (_this.state !== MouseState.L_DOWN)
                return;
            var colliding = _this._collider.check(_this, entity);
            var validTarget = _this._targetID === false || _this._targetID === entity.uid;
            if (colliding && validTarget) {
                _this._targetID = entity.uid;
                f();
            }
        });
        this.on(MouseState.L_UP, function () {
            _this._targetID = false;
        });
    };
    Cursor.prototype.onEntityHover = function (entity, f) {
        this._collider.listen(this, entity, f);
    };
    return Cursor;
}(Entity));
export { Cursor };
