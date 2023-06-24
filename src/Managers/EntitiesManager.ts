import { Entity } from '../Primitives/Entity.js'
import { Context, UID } from '../Types/types.js';

export class EntitiesManager {
    entities: Array<Entity>;
    private static _instance: EntitiesManager
    private _context: Context
    private constructor(ctx: Context) {
        this.entities = [];
        this._context = ctx;
    }
    public static getInstance(ctx: Context | boolean = false): EntitiesManager {
        if (!EntitiesManager._instance) {
            EntitiesManager._instance = new EntitiesManager(ctx as Context);
        }
        return EntitiesManager._instance;
    }
    register(entity: Entity): UID {
        const uid = Object.keys(this.entities).length as UID;
        this.entities[uid] = entity;
        return uid;

    }
    render() {
        if (!this.entities.length) return;
        this.entities.sort((a: Entity, b: Entity) => {
            return a.depth - b.depth;
        })
        this.entities.forEach((entity: Entity) => {
            if (!entity.visible) return;
            entity.render(this._context)
        });
    }
}