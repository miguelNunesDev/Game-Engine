import { Vector, Canvas, Context, Size } from "./Types/types.js";
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
export class Game {
    private static _instance: Game
    private _canvas: Canvas
    private _context: Context
    private static _position: Vector
    private _size: Size
    private _world: World

    public fill: string

    static DOC: any
    static WINDOW: Window

    public debug: DebugManager
    public time: TimeManager
    public cursor: Cursor
    public entities: EntitiesManager
    public collision: CollisionManager
    public scene: SceneManager
    public asset: AssetManager
    public camera: CameraManager

    private constructor(canvas: Canvas) {

        this._canvas = canvas;
        this._context = canvas.getContext('2d') as Context;
        this.fill = CozyColors.green100

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

    public clear() {
        this.context.clearRect(0, 0, this.size.w, this.size.h);
        this.context.fillStyle = this.fill;
        this.context.fillRect(0, 0, this.size.w, this.size.h);
    }

    public render() {
        this.clear();
        this.scene.current.render();
        this.entities.render();
        this.debug.render();

    }

    public update() {
        this.time.updateDelta();
        window.requestAnimationFrame(() => {
            this.collision.update();
            this.render();
            this.update();
        });
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