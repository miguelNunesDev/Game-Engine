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
        cursor.on(MouseState.MOVE, function () {
            if (cursor.state !== MouseState.L_DOWN)
                return;
            var time = TimeManager.getInstance();
            var lastPosition = cursor.position.world;
            var intervalIndex = time.startInterval();
            requestAnimationFrame(function () {
                var deltaTime = time.endInterval(intervalIndex);
                var deltaPos = Vector.sub(cursor.position.world, lastPosition);
                console.log(lastPosition, deltaPos);
                _this._position = Vector.add(_this._position, Vector.mult(cursor.deltaPosition, deltaTime * 3));
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
