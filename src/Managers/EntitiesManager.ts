import { Entity } from '../Primitives/Entity.js'
import { Context, UID } from '../Types/types.js';

export class EntitiesManager {
    entities: Array<Entity>;
    private _context: Context
    constructor(ctx: Context) {
        this.entities = [];
        this._context = ctx;
    }
    register(entity: Entity): UID {
        const uid = Object.keys(this.entities).length as UID;
        this.entities[uid] = entity;
        return uid;

    }
    render() {
        if (!this.entities.length) return;
        this.entities.forEach((entity: Entity) => {
            if(!entity.visible) return;
            entity.render(this._context)
        });
    }
}