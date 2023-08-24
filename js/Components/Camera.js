import { TimeManager } from "../Managers/TimeManager.js";
import { Cursor } from "../Primitives/Cursor.js";
import { CursorState, Vector } from "../Types/types.js";
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
            if (cursor.state !== CursorState.PRIMARY_DOWN)
                return;
            var lastPosition = cursor.transform.position;
            requestAnimationFrame(function () {
                var deltaPos = Vector.sub(cursor.transform.position, lastPosition);
                console.log({ camera: _this._position, delta: deltaPos, total: Vector.add(deltaPos, _this._position) });
                _this._position = Vector.add(deltaPos, _this._position);
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
