import { Anchor, TransformData } from "../Types/transform.js";
import { Angle, Size, TransformEvents, Vector } from "../Types/types.js"

class _Position {
    private _local: Vector
    private _world: Vector
    constructor(
        world?: Vector,
        local?: Vector,
        private _precision: number = 3
    ) {
        this._world = world?.fixed(_precision) ?? Vector.zero;
        this._local = local?.fixed(_precision) ?? Vector.zero;
    }
    get world() { return this._world };
    get local() { return this._local };

    set world(pos: Vector) {
        this._world = pos.fixed(this._precision);
        this._local = Vector.sub(pos, this._world).fixed(this._precision);
    }
    set local(pos: Vector) {
        this._local = pos.fixed(this._precision);
        this._world = Vector.sub(pos, this._local).fixed(this._precision);
    }
    resetLocal(pos: Vector = Vector.zero) {
        this._local = pos.fixed(this._precision);
    }

}

class _Size {
    private _local: Size
    private _world: Size
    constructor(
        world?: Size,
        private _precision: number = 3
    ) {
        this._world = world?.fixed(_precision) ?? Size.zero;
        this._local = new Size(1);
    }
    get world() { return this._world };
    get local() { return this._local };

    set world(pos: Size) {
        this._world = pos.fixed(this._precision);
        this._local = Size.sub(pos, this._world).fixed(this._precision);
    }
    set local(pos: Size) {
        this._local = pos.fixed(this._precision);
        this._world = Size.sub(pos, this._local).fixed(this._precision);
    }
    scale(pos: Size) {
        this._local = Size.mult(pos, this._local);
        this._world = Size.mult(pos, this._world);
    }

}

class _Rotation {
    private _local: number
    private _world: number
    constructor(
        angle: number = 0,
        private _type: Angle = 'degre',
        private precision: number = 3
    ) {
        this._world = this._type === 'degre' ? _Rotation.toQuartenion(angle) : angle;
        this._local = 0;
    }
    static toDegres(deg: number) { if (deg === 0) return deg; return (deg / Math.PI) * 180 }
    static toQuartenion(quartenion: number) { if (quartenion === 0) return quartenion; return (quartenion * Math.PI) / 180 }

    get world() { return this._world };
    get local() { return this._local };

    set world(quartenion: number) {
        const delta = quartenion - this._world;
        this._world = quartenion;
        this._local = Number(delta.toFixed(this.precision));
    }
    set local(quartenion: number) {
        const delta = quartenion - this._local;
        this._local = quartenion;
        this._world = Number(delta.toFixed(this.precision));
    }
    rotate(_angle: number, type: Angle = 'degre') {
        const angle = type === 'degre' ? _Rotation.toQuartenion(_angle) : _angle;
        this._local += angle;
        this._world += this.world;
    }

}

export class Transform {
    private _actions: { [key in TransformEvents]?: Array<Function> }
    protected _position: _Position

    protected _size: _Size
    public scale: Function

    protected _rotation: _Rotation
    public rotate: Function

    private _center: Vector

    private _anchor: Anchor
    constructor(transform: TransformData, protected _precision: number = 3) {
        this._position = new _Position(transform.position, null, this._precision);
        this._center;
        this._size = new _Size(transform.size, this._precision);
        this._rotation = new _Rotation(transform.rotation)
        this.scale = this._size.scale;
        this.rotate = this._rotation.rotate;
        this._actions = {}
    }
    on(cb: Function, state: TransformEvents) {
        if (!this._actions[state]) this._actions[state] = []
        this._actions[state].push(cb);
    }
    initActions(states: Array<TransformEvents>, value: any) {
        states.forEach(state => {
            if (!this._actions[state]) return;
            this._actions[state]?.forEach(action => action(value))
        })
    }
    get local() {
        return {
            position: this._position.local,
            rotation: this._rotation.local,
            size: this._size.local
        };
    }
    get position() { return this._position.world; }
    set position(pos: Vector) {
        this.initActions(['change', 'position'], pos);
        this._position.world = pos;
        this._center = this._calculateCenter(pos);

    }
    move(delta: Vector) {
        this.position = Vector.add(this.position, delta);
    }
    moveCenter(delta: Vector) {
        this.center = Vector.add(this.position, delta);
    }
    set localPosition(pos: Vector) {
        this._position.local = pos;
    }
    private _calculateCenter(_pos?: Vector, _size?: Size) {
        const pos = _pos ?? this._position.world;
        const size = _size ?? this._size.world;
        const half = Size.mult(size, 0.5);
        return new Vector(
            pos.x + half.w,
            pos.y + half.h
        ).fixed(this._precision);
    }
    set center(pos: Vector) {
        this._center = pos;
        const half = Size.mult(this._size.world, 0.5);
        this._position.world = new Vector(
            pos.x - half.w,
            pos.y - half.h
        )
    }
    get center() {
        this._center = this._center ?? this._calculateCenter();
        return this._center
    }

    get size() { return this._size.world }
    set size(size: Size) {
        this.initActions(['change', 'scale'], size);
        this._size.world = size
    }
    set localSize(size: Size) {
        this.initActions(['change', 'scale'], size);
        this._size.local = size
    }

    get rotation() { return this._rotation.world }
    set rotation(deg: number) {
        this.initActions(['change', 'scale'], deg);
        this._rotation.world = _Rotation.toQuartenion(deg);
    }
    set localRotation(deg: number) {
        this.initActions(['change', 'scale'], deg);
        this._rotation.local = _Rotation.toQuartenion(deg);
    }

    get data(): TransformData {
        return {
            position: this._position.world,
            size: this._size.world,
            rotation: this._rotation.world,
        }
    }
    getCorner(corner: Exclude<Anchor, Vector>) {
        switch (corner) {
            case 'top-left':
                return this.position
            case 'bottom-right':
                return Vector.add(this.position, this.size.raw)
            case 'center':
                return this.center
            case 'top-right':
                return new Vector(this.position.x + this.size.w, this.position.y)
            case 'bottom-left':
                return new Vector(this.position.x, this.position.y + this.size.h)
            case 'top': 
                return new Vector(this.position.x)
            default:
                break;
        }
    }

    get localData(): TransformData {
        return {
            position: this._position.local,
            size: this._size.local,
            rotation: this._rotation.local
        }
    }

    get anchor(): Vector {
        if (Vector.is(this._anchor)) return this._anchor
        const pos = new Vector(
            this.position.x + this.size.w * 0.5,
            this.position.y + this.size.h * 0.5
        )
        if (this._anchor.includes('top')) pos.y = this.position.y
        if (this._anchor.includes('bottom')) pos.y = this.position.y + this.size.h
        if (this._anchor.includes('left')) pos.x = this.position.x
        if (this._anchor.includes('right')) pos.x = this.position.x + this.size.w

        return pos;

    }
    set anchor(anchor: Anchor) {
        this._anchor = anchor;
    }


}

