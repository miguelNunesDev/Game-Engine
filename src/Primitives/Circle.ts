import { Container, Context, Size, Vector } from "../Types/types.js";
import { Entity } from "./Entity.js";

export class Circle extends Entity {
    private _radius: number
    constructor(
        position: Vector,
        radius: number,
        parent?: Container,
        private _stroke = 'white',
        private _fill = 'white'
    ) {
        super(
            position,
            new Size(radius * 2),
            0,
            parent
        )
        console.log(this.transform.center);
        
        
        this._radius = radius;
        this.visible = false;

    }


    set size(size: Size) {
        this.transform.size = size;
        this._radius = size.w * 0.5

    }
    render(ctx: Context) {        
        const arcPos = Vector.add(this.transform.position, this._radius);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(arcPos.x, arcPos.x, this._radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this._stroke;
        ctx.fillStyle = this._fill;
        ctx.fill();
        ctx.stroke();
    }
}