import { EntitiesManager } from "../Managers/EntitiesManager.js";
import { Containable } from "../Modules/Containable.js";
import { EventListener } from "../Modules/EventListener.js";
import { Transform } from "../Modules/Transform.js";
import { TransformData } from "../Types/transform.js";
import { Size, Vector, UID, Context, Container } from "../Types/types.js";


export class Entity {
    readonly transform: Transform
    readonly container: Containable
    readonly event: EventListener
    private _uid: UID
    private _visible: boolean
    protected _depth: number
    constructor(tranform: TransformData, parent?: Container) {
        this._uid = EntitiesManager.getInstance().register(this);
        this.transform = new Transform(tranform);
        this.container = new Containable(this, parent);
        this.event = new EventListener(this);
        this._visible = true;
        this._depth = 1

        this.visible = true;
    }

    get depth() { return this.transform.position.y * this._depth }
    set depth(depth: number) { this._depth = depth }
    get visible() { return this._visible; }
    set visible(bol: boolean) {
        this._visible = bol;
        this.container.setChildsVisibility(bol);
    }

    get uid(): UID { return this._uid }

    render(ctx: Context) { }
}