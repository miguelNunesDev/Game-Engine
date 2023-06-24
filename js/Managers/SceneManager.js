import { Scene } from "../Components/Scene.js";
var SceneManager = /** @class */ (function () {
    function SceneManager(ctx, size) {
        this._current = new Scene();
        this._tileSize = size;
    }
    SceneManager.getInstance = function (ctx, size) {
        if (ctx === void 0) { ctx = false; }
        if (!SceneManager._instance && size) {
            SceneManager._instance = new SceneManager(ctx, size);
        }
        return SceneManager._instance;
    };
    Object.defineProperty(SceneManager.prototype, "current", {
        get: function () { return this._current; },
        set: function (scene) { this._current = scene; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "tileSize", {
        get: function () { return this._tileSize; },
        set: function (size) { this._tileSize = size; },
        enumerable: false,
        configurable: true
    });
    SceneManager.prototype.render = function () {
    };
    return SceneManager;
}());
export { SceneManager };
