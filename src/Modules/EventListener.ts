import { CollisionManager } from "../Managers/CollisionManager.js"
import { EventManager } from "../Managers/EventManager.js"
import { Cursor } from "../Primitives/Cursor.js"
import { Entity } from "../Primitives/Entity.js"
import { CursorState, UID } from "../Types/types.js"

type Event = 'render' | 'update' | 'hover' | 'click';
export class EventListener {
    private _uid: UID
    private _actions: { [key in Event]?: Array<Function> }
    constructor(private _entity: Entity) {
        this._actions = {
            render: [],
            update: [],
            hover: [],
            click: []
        }
        this._uid = EventManager.getInstance().subscribe(this);
    }
    get actions() {return this._actions}
    on(state: Event, cb: Function) {
        const id = this._actions[state].length;
        this._actions[state].push(cb);
        return id;
    }
    isClicked = () => {
        if (!this._entity.transform) return false;
        const cursor = Cursor.getInstance();
        return this.isHover && cursor.state === CursorState.PRIMARY_DOWN;
    }
    isHover = () => {
        if (!this._entity.transform) return false;
        const cursor = Cursor.getInstance();
        const collider = CollisionManager.getInstance();
        
        return collider.check(cursor.transform, this._entity.transform);

    }
}