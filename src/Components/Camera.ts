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
        cursor.on(MouseState.MOVE, () => {

            if (cursor.state !== MouseState.L_DOWN) return;
            const time = TimeManager.getInstance()
            let lastPosition = cursor.position.world;
            const intervalIndex = time.startInterval()
            requestAnimationFrame(() => {
                const deltaTime = time.endInterval(intervalIndex);
                const deltaPos = Vector.sub(cursor.position.world, lastPosition);
                console.log(lastPosition, deltaPos);
                this._position = Vector.add(this._position, Vector.mult(cursor.deltaPosition, deltaTime * 3))
                lastPosition = this._position;
            })


        })
    }
    get position() { return this._position };
    set position(pos: Vector) { this._position = pos }
    get zoom() { return this._zoom };
    set zoom(zoom: number) { this._zoom = zoom };
}