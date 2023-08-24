import { Entity } from "../Primitives/Entity.js";
import { Square } from "../Primitives/Square.js";
import { Context, Vector } from "../Types/types";

export class DebugManager {
    ctx: Context
    queue: Array<Function>
    static _instance: DebugManager
    private constructor(ctx: Context) {
        this.ctx = ctx;
        this.queue = []
    }
    public static getInstance(ctx: Context | boolean = false): DebugManager {
        if (!DebugManager._instance) {
            DebugManager._instance = new DebugManager(ctx as Context);
        }
        return DebugManager._instance;
    }
    boundingBox(entity: Entity, color: string = 'gray') {
        const box = new Square(
            entity.transform.data.position,
            entity.transform.data.size,
            entity,
            color
        )
        box.visible = false;
        box.style = 'dashed';

        this.queue.push((ctx: Context) => {
            box.render(ctx)

        });

    }
    line(pi: Vector, pf: Vector, color: string = 'gray') {
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(pi.x, pi.y);
        this.ctx.lineTo(pf.x, pf.y);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.setLineDash([])
    }
    render() {
        if (!this.queue.length) return;
        this.queue.forEach(cb => { cb(this.ctx) })
    }
}