import { Vector, Size } from "./Types/types.js";
// import { MouseManager } from './Managers/MouseManager.js';
import { EntitiesManager } from "./Managers/EntitiesManager.js";
// import { CollisionManager } from "./Managers/CollisionManager.js";
import { TimeManager } from "./Managers/TimeManager.js";
// import { UiManager } from "./Managers/UiManager.js";
import { DebugManager } from "./Managers/DebugManager.js";
import { Cursor } from "./Primitives/Cursor.js";
import { World } from "./Primitives/World.js";
import { CollisionManager } from "./Managers/CollisionManager.js";
// SINGLETON
var Game = /** @class */ (function () {
    // public ui: UiManager
    function Game(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        Game._instance = this;
        Game.DOC = document;
        Game.WINDOW = window;
        Game._position = this.setPosition(canvas.getBoundingClientRect());
        this._size = this.setSize(canvas.getBoundingClientRect());
        this._world = World.getInstance();
        //MANAGERS
        this.time = TimeManager.getInstance();
        this.entities = new EntitiesManager(this._context);
        this.debug = DebugManager.getInstance(this._context);
        this.collision = CollisionManager.getInstance();
        // this.ui = UiManager.getIntance();
        this.cursor = Cursor.getInstance(this.canvas);
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.size.w, this.size.h);
        // const panel = document.querySelector('#debug-panel');
        // if (panel) {
        //     this._debugPanel = {
        //         element: panel as HTMLLabelElement,
        //         content: []
        //     }
        //     this.ui.queue(this._debugPanel)
        // }
    }
    Game.prototype.clear = function () {
        this.context.clearRect(0, 0, this.size.w, this.size.h);
        this.context.fillStyle = '#e3d7bd';
        this.context.fillRect(0, 0, this.size.w, this.size.h);
    };
    Game.prototype.render = function () {
        this.clear();
        this.entities.render();
        this.debug.render();
    };
    Game.prototype.update = function () {
        var _this = this;
        window.requestAnimationFrame(function () {
            // this.ui.queue(`x: ${this.mouse.position.x} y: ${this.mouse.position.y}`);
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
//# sourceMappingURL=Game.js.map