var CameraManager = /** @class */ (function () {
    function CameraManager(camera) {
        this._current = camera;
    }
    CameraManager.getInstance = function (camera) {
        if (camera === void 0) { camera = false; }
        if (!CameraManager._instance && camera) {
            CameraManager._instance = new CameraManager(camera);
        }
        return CameraManager._instance;
    };
    Object.defineProperty(CameraManager.prototype, "current", {
        get: function () { return this._current; },
        set: function (camera) { this._current = camera; },
        enumerable: false,
        configurable: true
    });
    return CameraManager;
}());
export { CameraManager };
