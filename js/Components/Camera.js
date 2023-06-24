import { TimeManager } from "../Managers/TimeManager.js";
import { Cursor } from "../Primitives/Cursor.js";
import { MouseState, Vector } from "../Types/types.js";
var Camera = /** @class */ (function () {
    function Camera(pos, zoom) {
        this._position = pos;
        this._origin = pos;
        this._zoom = zoom;
        this.initListeners();
    }
    Camera.prototype.initListeners = function () {
        var _this = this;
        var cursor = Cursor.getInstance();
        var time = TimeManager.getInstance();
        time.onUpdate(function (delta) {
            if (cursor.state !== MouseState.L_DOWN)
                return;
            var lastPosition = cursor.position.world;
            requestAnimationFrame(function () {
                var deltaPos = Vector.sub(cursor.position.world, lastPosition);
                console.log(cursor.position.world);
                _this._position = Vector.add(_this._position, Vector.mult(deltaPos, delta * 1));
                lastPosition = _this._position;
            });
        });
    };
    Object.defineProperty(Camera.prototype, "position", {
        get: function () { return this._position; },
        set: function (pos) { this._position = pos; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Camera.prototype, "zoom", {
        get: function () { return this._zoom; },
        set: function (zoom) { this._zoom = zoom; },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    return Camera;
}());
export { Camera };
