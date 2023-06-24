import { Vector, Size } from "./Types/types.js";
import { EntitiesManager } from "./Managers/EntitiesManager.js";
import { TimeManager } from "./Managers/TimeManager.js";
import { DebugManager } from "./Managers/DebugManager.js";
import { Cursor } from "./Primitives/Cursor.js";
import { World } from "./Primitives/World.js";
import { CollisionManager } from "./Managers/CollisionManager.js";
import { CozyColors } from "./assets/colors.js";
import { SceneManager } from "./Managers/SceneManager.js";
import { AssetManager } from "./Managers/AssetsManager.js";
import { Camera } from "./Components/Camera.js";
import { CameraManager } from "./Managers/CameraManager.js";
// SINGLETON
var Game = /** @class */ (function () {
    function Game(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this.fill = CozyColors.green100;
        Game._instance = this;
        Game.DOC = document;
        Game.WINDOW = window;
        Game._position = this.setPosition(canvas.getBoundingClientRect());
        this._size = this.setSize(canvas.getBoundingClientRect());
        this._world = World.getInstance();
        //MANAGERS
        this.asset = AssetManager.getInstance();
        this.scene = SceneManager.getInstance(this._context, new Size(200, 150));
        this.time = TimeManager.getInstance();
        this.entities = EntitiesManager.getInstance(this._context);
        this.debug = DebugManager.getInstance(this._context);
        this.collision = CollisionManager.getInstance();
        this.cursor = Cursor.getInstance(this.canvas);
        this.camera = CameraManager.getInstance(new Camera(Vector.zero(), 1));
        this.context.fillStyle = this.fill;
        this.context.fillRect(0, 0, this.size.w, this.size.h);
    }
    Game.prototype.clear = function () {
        this.context.clearRect(0, 0, this.size.w, this.size.h);
        this.context.fillStyle = this.fill;
        this.context.fillRect(0, 0, this.size.w, this.size.h);
    };
    Game.prototype.render = function () {
        this.clear();
        this.scene.current.render();
        this.entities.render();
        this.debug.render();
    };
    Game.prototype.update = function () {
        var _this = this;
        this.time.updateDelta();
        window.requestAnimationFrame(function () {
            _this.collision.update();
            _this.render();
            _this.update();
        });
    };
    Game.getInstance = function (canvas) {
        if (canvas === void 0) { canvas = false; }
        if (!Game._instance && typeof canvas !== 'boolean') {
            Game._instance = new Game(canvas);
        }
        return Game._instance;
    };
    Object.defineProperty(Game, "position", {
        // GETTERS & SETTERS
        get: function () { return this._position; },
        enumerable: false,
        configurable: true
    });
    ;
    Game.prototype.setPosition = function (pos) { return new Vector(pos.left, pos.top); };
    Object.defineProperty(Game.prototype, "size", {
        get: function () { return this._size; },
        enumerable: false,
        configurable: true
    });
    Game.prototype.setSize = function (size) { return new Size(size.width, size.height); };
    Object.defineProperty(Game.prototype, "canvas", {
        get: function () { return this._canvas; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "context", {
        get: function () { return this._context; },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
export { Game };
