import { EventListener } from "../Modules/EventListener.js";
import { UID } from "../Types/types.js";
import { Event } from "../Types/event.js"

export class EventManager {
    private _actions: {
        [key in Event]?: Array<{ id: UID, cb: Function }>
    }
    private _keyActions: Map<string, Array<Function>>
    private _activeKeys: Set<string>
    private _events: Map<number, EventListener>;
    private static _instance: EventManager
    private constructor() {
        this._events = new Map();
        this._keyActions = new Map();
        this._activeKeys = new Set();
        this._actions = {
            render: [],
            update: [],
            hover: [],
            clickDown: [],
            clickUp: []
        }
        document.addEventListener('keypress', e => this._activeKeys.add(e.key))
        document.addEventListener('keyup', (e) => this._activeKeys.delete(e.key))
    }
    public static getInstance(): EventManager {
        EventManager._instance = EventManager._instance
            ? EventManager._instance
            : new EventManager();
        return EventManager._instance;
    }
    subscribe(event: EventListener): UID {
        const uid = this._events.size;
        this._events.set(uid, event);
        return uid;

    }
    listen(id: UID, state: Event, cb: Function): UID {
        const eventId = this._actions[state].length;
        this._actions[state].push({ id, cb });
        return eventId;
    }
    listenKeyEvent(key: string, cb: Function): UID {
        const keyActions = this._keyActions.get(key);
        if (!keyActions) {
            this._keyActions.set(key, [cb])
            return 0;
        }
        const id = this._keyActions.get(key).length;
        this._keyActions.get(key).push(cb);
        return id;
    }
    render() {
        this._actions?.update.forEach(event => event.cb());
    }
    update = () => {
        this._actions?.update.forEach(event => event.cb());
        this.cursorEvents();
        this.keyEvents();
    }
    keyEvents() {
        this._activeKeys.forEach(key => {
            this._keyActions.get(key)?.forEach(cb => cb())
        })
    }
    cursorEvents() {
        this._actions.hover.forEach(e => {
            if (this._events.get(e.id).isHover()) e.cb();
        });
        this._actions.clickUp.forEach(e => {
            if (this._events.get(e.id).isClicked()) e.cb();
        })
        this._actions.clickDown.forEach(e => {
            if (this._events.get(e.id).isClicked()) e.cb();
        })
    }
}