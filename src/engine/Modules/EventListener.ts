import { CollisionManager } from "../Managers/CollisionManager.js"
import { EventManager } from "../Managers/EventManager.js"
import { Cursor } from "../Primitives/Cursor.js"
import { Entity } from "../Primitives/Entity.js"
import { Event } from "../Types/event.js"
import { CursorState, UID } from "../Types/types.js"


type KeyLayout = { [name: string]: Array<string> }
type KeyLayoutMap = {
    [name: string]: { [key: string]: number }
}
export class EventListener {
    private _uid: UID
    private _keyLayout: KeyLayout
    private _keyMap: KeyLayoutMap
    constructor(private _entity: Entity) {
        this._uid = EventManager.getInstance().subscribe(this);
        this._keyMap = {}
    }
    on(state: Event, cb: Function) {
        const event = EventManager.getInstance();
        return event.listen(this._uid, state, cb);
    }
    isClicked = () => {
        if (!this._entity.transform) return false;
        const cursor = Cursor.getInstance();
        
        return this.isHover() && cursor.state === CursorState.PRIMARY_DOWN;
    }
    isHover = () => {        
        if (!this._entity.transform) return false;
        const cursor = Cursor.getInstance();
        const collider = CollisionManager.getInstance();
        
        return collider.check(this._entity.transform,cursor.transform);

    }
    onKeyEvent(eventName: string, cb: Function) {
        if (!this._keyLayout[eventName]) {
            return console.error('No Event in keyLayout');
        }
        const manager = EventManager.getInstance();
        this._keyLayout[eventName].forEach(key => {
            const id = manager.listenKeyEvent(key, cb);
            if (!this._keyMap[eventName]) this._keyMap[eventName] = {}
            this._keyMap[eventName][key] = id;
        })
    }
    set keyLayout(layout: KeyLayout) {
        this._keyLayout = layout;
    }
    get keyLayout() { return this._keyLayout }
}