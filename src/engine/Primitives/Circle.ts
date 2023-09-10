import { ObjectStyle } from "../Types/styles.js";
import { Container, Context, Size, Vector } from "../Types/types.js";
import { Entity } from "./Entity.js";

export class Circle extends Entity {
    private _radius: number
    constructor(
        x: number,
        y: number,
        radius: number,
        private _style: ObjectStyle,
        parent?: Container,
    ) {
        super(
            { position: new Vector(x, y ?? x), size: new Size(radius * 2), rotation: 0 },
            parent
        )


        this._radius = radius;
        this.visible = true;

    }


    set size(size: Size) {
        this.transform.size = size;
        this._radius = size.w * 0.5

    }
    set radius(r: number) {
        this._radius = r;
        this.transform.size = new Size(r * 2);
    }
    get radius() { return this._radius }
    render(ctx: Context) {
        const arcPos = Vector.add(this.transform.position, this._radius);
        ctx.save();
        ctx.beginPath();
        ctx.arc(arcPos.x, arcPos.y, this._radius, 0, 2 * Math.PI);
        // Fill
        ctx.globalAlpha = this._style?.fill?.[1] || this._style?.opacity || 1;
        ctx.fillStyle = this._style?.fill?.[0] || '';
        ctx.fill();
        ctx.globalAlpha = this._style?.stroke?.[2] || this._style?.opacity || 1;
        ctx.strokeStyle = this._style?.stroke?.[0] || this._style?.fill?.[0];
        ctx.lineWidth = this._style?.stroke?.[1] || 0;
        ctx.stroke();
        ctx.restore();

    }
}