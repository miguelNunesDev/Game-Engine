import { TimeManager } from "../Managers/TimeManager.js";
import { Cursor } from "../Primitives/Cursor.js";
import { CursorState, Vector } from "../Types/types.js";

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
            
            if (cursor.state !== CursorState.PRIMARY_DOWN) return;            
            
            let lastPosition = cursor.transform.position;
            requestAnimationFrame(() => {
                const deltaPos = Vector.sub(cursor.transform.position, lastPosition);        
                console.log({camera:this._position, delta: deltaPos,total:Vector.add(deltaPos, this._position)});
                        
                this._position = Vector.add(deltaPos, this._position);                
            })


        })
    }
    get position() { return this._position };
    set position(pos: Vector) { this._position = pos }
    get zoom() { return this._zoom };
    set zoom(zoom: number) { this._zoom = zoom };
}