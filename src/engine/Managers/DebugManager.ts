import { Transform } from "../Modules/Transform.js";
import { Entity } from "../Primitives/Entity.js";
import { Line } from "../Primitives/Line.js";
import { Square } from "../Primitives/Square.js";
import { UIText } from "../Primitives/UI.js";
import { Anchor, TransformData } from "../Types/transform.js";
import { Context, Size, UID, Vector } from "../Types/types.js";

type DebugElements = {
    entity: Entity,
    box?: Square,
    texts?: Array<UIText>
}
export class DebugManager {
    ctx: Context
    private _queue: Map<UID, DebugElements>
    private _lineQueue: Array<Line> 
    static _instance: DebugManager
    private constructor(ctx: Context) {
        this.ctx = ctx;
        this._queue = new Map()
    }
    public static getInstance(ctx: Context | boolean = false): DebugManager {
        if (!DebugManager._instance) {
            DebugManager._instance = new DebugManager(ctx as Context);
        }
        return DebugManager._instance;
    }
    transform(entity: Entity) {
        const box = new Square({position:Vector.zero, size:entity.transform.size});
        box.style = 'dashed';
        box.stroke = 'gray'

        this._queue.set(entity.uid, {
            entity,
            box,
            texts: [
                new UIText('', {}, { family: 'andale mono' }),
                new UIText('', {}, { family: 'andale mono' }),
            ]
        })
    }
    updateTransform(element: DebugElements) {
        const data = element.entity.transform.data
        element.box.transform.position = data.position

        const textTransform = {
            position: Vector.sub(data.position, new Vector(0,12)),
            size: Size.add(data.size, 30)
        }
        this.setDebugText(element.texts[0], `pos(${data.position.x},${data.position.y}); angle(${data.rotation})`, textTransform, 'top-left');
        this.setDebugText(element.texts[1], `size(${data.size.w},${data.size.h})`, textTransform, 'bottom-left');
    }
    setDebugText(text: UIText, content: string, _transform: TransformData, anchor: Anchor) {
        const transform = new Transform(_transform)
        transform.anchor = anchor;
        text.transform.position = transform.anchor
        text.content = content;
        text.toUppercase();
        text.transform.size = new Size(12)
        return text
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
    update() {
        if (!this._queue.size) return;
        
        this._queue.forEach(el => {
            this.updateTransform(el);
        })
    }
}