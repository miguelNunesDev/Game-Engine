import { CollisionManager } from "../Managers/CollisionManager.js";
import { Vector, CursorState } from "../Types/types.js";
import { createObjectFromEnum, isTouchDevice } from "../Helper.js";
import { Transform } from "../Modules/Transform.js";
var Cursor = /** @class */ (function () {
    function Cursor(canvas) {
        // super(Vector.zero, Size.zero, 0);
        this._collider = CollisionManager.getInstance();
        this.transform = new Transform({});
        this.lastPosition = Vector.zero;
        this.state = CursorState.IDLE;
        this.canvas = canvas;
        this.actions = {
            mouse: createObjectFromEnum(CursorState),
            touch: createObjectFromEnum(CursorState),
        };
        this._targetID = false;
        this.deltaPosition = Vector.zero;
        this._absolutePosition = Vector.zero;
        this.initListeners(this.canvas);
        this._type = isTouchDevice() ? 'touch' : 'mouse';
    }
    Cursor.getInstance = function (canvas) {
        if (!Cursor._instance && !canvas)
            console.error('No context provided');
        Cursor._instance = Cursor._instance
            ? Cursor._instance
            : new Cursor(canvas);
        return Cursor._instance;
    };
    Cursor.prototype.initListeners = function (canvas) {
        var _this = this;
        document.addEventListener('mousedown', function () {
            console.log('MOUSE DOWN');
            _this.state = CursorState.PRIMARY_DOWN;
            if (!_this.actions['mouse'][CursorState.PRIMARY_DOWN].length)
                return;
            _this.actions['mouse'][CursorState.PRIMARY_DOWN].forEach(function (func) {
                func();
            });
        });
        document.addEventListener('touchstart', function (e) {
            _this.state = CursorState.PRIMARY_DOWN;
            if (!_this.actions['touch'][CursorState.PRIMARY_DOWN].length)
                return;
            _this.actions['touch'][CursorState.PRIMARY_DOWN].forEach(function (func) {
                func();
            });
        }, { passive: false });
        // document.addEventListener('touchmove', () => {
        //     this.state = CursorState.DRAG;
        //     this.actions[CursorState.DRAG].forEach(action => {
        //         action();
        //     });
        // }, { passive: false })
        document.addEventListener('touchend', function () {
            _this.state = CursorState.PRIMARY_UP;
            _this.actions['touch'][CursorState.PRIMARY_UP].forEach(function (action) {
                action();
            });
        });
        document.addEventListener('dragstart', function (e) {
            e.preventDefault();
            _this.state = CursorState.PRIMARY_DOWN;
            _this.actions['touch'][CursorState.PRIMARY_DOWN].forEach(function (action) {
                action();
            });
        });
        document.addEventListener('dragend', function () {
            _this.state = CursorState.PRIMARY_UP;
            _this.actions['touch'][CursorState.PRIMARY_UP].forEach(function (action) {
                action();
            });
        });
        document.addEventListener('mouseleave', function () {
            _this.state = CursorState.LEAVE;
            if (!_this.actions['mouse'][CursorState.LEAVE].length)
                return;
            _this.actions['mouse'][CursorState.LEAVE].forEach(function (action) {
                action();
            });
        });
        document.addEventListener('mouseup', function () {
            _this.state = CursorState.PRIMARY_UP;
            if (!_this.actions['mouse'][CursorState.PRIMARY_UP].length)
                return;
            _this.actions['mouse'][CursorState.PRIMARY_UP].forEach(function (action) {
                action();
            });
        });
        document.addEventListener('mousemove', function (e) {
            _this.transform.position = _this.getAbsolutePosition(e);
            if (!_this.actions['mouse'][CursorState.MOVE].length)
                return;
            _this.actions['mouse'][CursorState.MOVE].forEach(function (action) {
                action();
            });
        });
        canvas.addEventListener('touchmove', function (e) {
        });
    };
    Cursor.prototype.on = function (state, f, type) {
        this.actions[type || this._type][state].push(f);
    };
    Cursor.prototype.getAbsolutePosition = function (e) {
        var rect = this.canvas.getBoundingClientRect();
        return new Vector(e.clientX - rect.left, e.clientY - rect.top);
    };
    return Cursor;
}());
export { Cursor };
