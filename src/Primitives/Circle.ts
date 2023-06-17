import { Context, Size, Vector } from "../Types/types.js";
import { Entity } from "./Entity.js";

export class Circle extends Entity {
    private _radius: number;
    private _stroke: string;
    private _fill: string;
    constructor(center: Vector, radius: number, parent: Entity | boolean = false, stroke = 'white', fill = 'white') {
        const pos = Vector.sub(center, radius)        
        const size = new Size(radius * 2)
        super(pos, size, parent)
        this._radius = radius;
        this._fill = fill;
        this._stroke = stroke;
        this.visible = false;

    }


    set size(size: Size) {
        this._size = size
        this._radius = size.w * 0.5

    }
    render(ctx: Context) {
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this._center.x, this._center.y, this._radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this._stroke;
        ctx.fillStyle = this._fill;
        ctx.fill();
        ctx.stroke();
    }
}