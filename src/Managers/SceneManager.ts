import { Scene } from "../Components/Scene.js";
import { Context, Size } from "../Types/types.js";

export class SceneManager {
    private static _instance: SceneManager
    private _current: Scene
    private _tileSize: Size
    private constructor(ctx: Context, size: Size) {
        this._current = new Scene();
        this._tileSize = size
    }
    public static getInstance(ctx: Context | boolean = false, size?: Size): SceneManager {
        if (!SceneManager._instance && size) {
            SceneManager._instance = new SceneManager(ctx as Context, size);
        }
        return SceneManager._instance;
    }
    get current() { return this._current }
    set current(scene: Scene) { this._current = scene }
    get tileSize() { return this._tileSize }
    set tileSize(size: Size) { this._tileSize = size }
    render() {

    }
}