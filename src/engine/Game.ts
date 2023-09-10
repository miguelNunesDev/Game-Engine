import { Vector, Canvas, Context, Size } from "./Types/types.js";
import { EntitiesManager } from "./Managers/EntitiesManager.js";
import { TimeManager } from "./Managers/TimeManager.js";
import { DebugManager } from "./Managers/DebugManager.js";
import { Cursor } from "./Primitives/Cursor.js";
import { World } from "./Primitives/World.js";
import { CollisionManager } from "./Managers/CollisionManager.js";
import { CozyColors } from "../assets/styles.js";
import { SceneManager } from "./Managers/SceneManager.js";
import { AssetManager } from "./Managers/AssetsManager.js";
import { Camera } from "./Components/Camera.js";
import { CameraManager } from "./Managers/CameraManager.js";
import { EventManager } from "./Managers/EventManager.js";
import { UIManager } from "./Managers/UiManager.js";

type GameEvents = 'update' | 'render';

// SINGLETON
export class Game {
    private static _instance: Game
    private _canvas: Canvas
    private _context: Context
    private static _position: Vector
    private _size: Size
    private _actions: { [key in GameEvents]?: Array<Function> }

    public fill: string

    static DOC: any
    static WINDOW: Window

    debug: DebugManager
    time: TimeManager
    cursor: Cursor
    entities: EntitiesManager
    collision: CollisionManager
    event: EventManager
    scene: SceneManager
    asset: AssetManager
    camera: CameraManager
    world: World
    ui: UIManager

    private constructor(canvas: Canvas) {

        this._canvas = canvas;
        this._context = canvas.getContext('2d') as Context;
        this.fill = CozyColors.green100


        Game._instance = this;
        Game.DOC = document;
        Game.WINDOW = window;

        Game._position = this.setPosition(canvas.getBoundingClientRect());
        this._size = this.setSize(canvas.getBoundingClientRect());

        //MANAGERS
        this.collision = CollisionManager.getInstance();
        this.cursor = Cursor.getInstance(this._canvas);
        this.asset = AssetManager.getInstance();
        this.scene = SceneManager.getInstance(this._context, new Size(200, 150));
        this.time = TimeManager.getInstance();
        this.entities = EntitiesManager.getInstance(this._context);
        this.debug = DebugManager.getInstance(this._context);
        this.event = EventManager.getInstance();
        this.ui = UIManager.getInstance(this._context)
        this.world = World.getInstance()


        this.context.fillStyle = this.fill;
        this.context.fillRect(0, 0, this.size.w, this.size.h);



    }

    public clear() {
        this.context.clearRect(0, 0, this.size.w, this.size.h);
        this.context.fillStyle = this.fill;
        this.context.fillRect(0, 0, this.size.w, this.size.h);
    }

    public render() {
        this.clear();
        this.scene.current.render();
        this.entities.render();
        this.ui.render();
        
        this.event.render();

    }
    public on(event: 'render' | 'update', cb: Function) {
        this._actions[event].push(cb);
    }

    public update() {
        window.requestAnimationFrame(() => {
            this.time.update();
            this.collision.update();
            this.event.update();
            this.debug.update();
            this.render();
            this.update();
        });
    }
    public init() {
        this.asset.load();
        this.update();
    }

    public static getInstance(canvas: Canvas | boolean = false): Game {
        if (!Game._instance && typeof canvas !== 'boolean') {
            Game._instance = new Game(canvas);
        }
        return Game._instance;
    }

    // GETTERS & SETTERS
    static get position(): Vector { return this._position };
    private setPosition(pos: DOMRect) { return new Vector(pos.left, pos.top) }

    get size(): Size { return this._size }
    private setSize(size: DOMRect) { return new Size(size.width, size.height) }

    get canvas(): Canvas { return this._canvas; }
    get context(): Context { return this._context; }

}