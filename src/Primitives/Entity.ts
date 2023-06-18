import { Game } from "../Game.js";
import { Size, Vector, Space, UID, Context, boundingBox, localVector, worldVector } from "../Types/types.js";
import { World } from "./World.js";

type Position = {
    local: localVector;
    world: worldVector;
}


export class Entity {
    private _position: Position
    protected _size: Size
    protected _center: localVector
    private _parent: Entity
    private _childs: Array<Entity>
    private _uid: UID
    private _visible: boolean
    constructor(pos: Vector = Vector.zero(), size: Size = Size.zero(), parent: Entity | Boolean = false) {
        this._uid = Game.getInstance().entities.register(this);
        this._parent = parent ? parent as Entity : World.getInstance() as Entity;
        this._childs = [];
        this._visible = true;

        this._parent.addChild(this);


        this._position = {
            world: { x: Number(pos.x.toFixed(3)), y: Number(pos.y.toFixed(3)) },
            local: Vector.sub(pos, this._parent.position.world)
        }

        this._size = size;

        this._center = new Vector(
            Number((this._position.world.x + this._size.w * 0.5).toFixed(3)),
            Number((this._position.world.y + this._size.h * 0.5).toFixed(3))
        )

        this.setPosition(pos);
        this.visible = true;

    }
    get visible() { return this._visible; }
    set visible(bol: boolean) {
        this._visible = bol;
        if (!this.childs.length) return;
        this.childs.forEach(child => { child.visible = bol });
    }

    scale(scalar: number) {
        this.size = Size.mult(this.size, scalar)
    }
    protected setChildsSize(size: Size): void {
        if (!this._childs.length) return;

        this._childs.forEach(child => {
            if (!child.size) return;
            child.size = Size.add(child.size, size);
        });
    }
    private updateChildsPosition(deltaPosition: Vector): void {

        if (!this._childs.length) return;

        this._childs.forEach((child) => {
            child.setPosition(Vector.add(child.position.world, deltaPosition), Space.WORLD)
        })
    }
    get uid(): UID { return this._uid }
    get childs(): Array<Entity> { return this._childs };
    set childs(childs: Array<Entity>) {
        this._childs = childs;
        this._childs.map((child) => { child.parent = this })
    }
    addChild(child: Entity): Entity {
        this._childs.push(child); return this._childs[this._childs.length - 1]
    }
    setChildsVisibility(bol: boolean) { this.childs.forEach(child => child.visible = bol); }

    get position(): Position {
        return this._position
    }
    setPosition(pos: Vector, space: Space = Space.WORLD) {
        const deltaPosition = Vector.sub(pos, this.position.world);
        switch (space) {
            case Space.LOCAL:
                // TODO:
                break;
            case Space.WORLD:
                this._position = {
                    local: Vector.sub(this.position.world, this._parent.position.world),
                    world: { x: Number(pos.x.toFixed(3)), y: Number(pos.y.toFixed(3)) }
                }
                break;
        }
        this._center = new Vector(
            this.position.world.x + Number((this._size.w * 0.5).toFixed(3)),
            this.position.world.y + Number((this._size.h * 0.5).toFixed(3))
        )
        this.updateChildsPosition(deltaPosition);
    }
    set center(pos: Vector) {
        this.setPosition(new Vector(
            Number((pos.x - this.size.w * 0.5).toFixed(3)),
            Number((pos.y - this.size.h * 0.5).toFixed(3))
        ))
    }
    get center() { return this._center }
    get size(): Size { return this._size }
    public set size(size: Size) {
        const deltaSize = Size.sub(this._size, size)
        this._size = { w: Number(size.w.toFixed(3)), h: Number(size.h.toFixed(3)) };
        this.setChildsSize(deltaSize);
    }
    get boundingBox(): boundingBox {
        return { position: this._position.world, size: this._size }
    }
    get parent() { return this._parent }
    set parent(e: Entity) {
        this._parent = e;
        this._parent.addChild(this);
        this.setPosition(this.position.world, Space.WORLD);
    }
    render(ctx: Context) { }
}