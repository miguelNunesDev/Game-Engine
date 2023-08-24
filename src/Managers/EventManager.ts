import { EventListener } from "../Modules/EventListener.js";
import { UID } from "../Types/types";

export class EventManager {
    private _events: Map<number, EventListener>;
    private static _instance: EventManager
    private constructor() {
        this._events = new Map();
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
    render() {
        this._events.forEach(e => {
            e.actions.render.forEach(cb => cb());
        })
    }
    update() {
        this._events.forEach(event => {
            event.actions.update.forEach(cb => cb());
            if (!event.isHover()) return;
            event.actions.hover.forEach(cb => cb())

            if (!event.isClicked()) return;
            event.actions.hover.forEach(cb => cb())

        });
    }
}