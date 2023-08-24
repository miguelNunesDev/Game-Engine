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
    move(pos: Vector) {
        this._local = Vector.add(pos, this._local);
        this._world = Vector.add(pos, this._world);
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
    public move: Function

    protected _size: _Size
    public scale: Function

    protected _rotation: _Rotation
    public rotate: Function

    private _center: Vector

    constructor(pos: Vector, size: Size, degre: number, protected _precision: number = 3) {
        this._position = new _Position(pos, null, this._precision);
        this._center;
        this._size = new _Size(size, this._precision);
        this._rotation = new _Rotation(degre)
        this.move = this._position.move;
        this.scale = this._size.scale;
        this.rotate = this._rotation.rotate;
        this._actions = {
            'change': [],
            'scale': [],
            'position': [],
            'rotate': []
        }
    }
    on(cb: Function, state: TransformEvents) {
        this._actions[state].push(cb);
    }
    initActions(states: Array<TransformEvents>, value: any) {
        states.forEach(state => {
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
    }
    set localPosition(pos: Vector) {
        this._position.local = pos;
    }

    set center(pos: Vector) {        
        const half = Size.mult(this._size.world, 0.5);


        this._position.world = new Vector(
            pos.x - half.w,
            pos.y - half.h
        )
    }
    get center() {
        if (this._center) return this._center
        
        const half = Size.mult(this._size.world, 0.5);
        
        this._center = new Vector(
            this._position.world.x - half.w,
            this._position.world.y - half.h
        ).fixed(this._precision);
        console.log(this._center, half, this.position);
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

    get data() {
        return {
            position: this._position.world,
            size: this._size.world,
            rotation: this._rotation.world
        }
    }


}

