import { TimeManager } from "../Managers/TimeManager.js";
import { Cursor } from "../Primitives/Cursor.js";
import { MouseState, Vector } from "../Types/types.js";

export class Camera {
    private _position: Vector
    private _zoom: number
    private _origin: Vector
    constructor(pos: Vector, zoom: number) {
        this._position = pos;
        this._origin = pos;
        this._zoom = zoom;

        this.initListeners();
    }
    initListeners() {
        const cursor = Cursor.getInstance();
        const time = TimeManager.getInstance();
        time.onUpdate((delta: number) => {
            
            if (cursor.state !== MouseState.L_DOWN) return;            
            
            let lastPosition = cursor.position.world;
            requestAnimationFrame(() => {
                const deltaPos = Vector.sub(cursor.position.world, lastPosition);
                console.log(cursor.position.world);
                
                this._position = Vector.add(this._position, Vector.mult(deltaPos, delta * 1))
                lastPosition = this._position;
            })


        })
    }
    get position() { return this._position };
    set position(pos: Vector) { this._position = pos }
    get zoom() { return this._zoom };
    set zoom(zoom: number) { this._zoom = zoom };
}