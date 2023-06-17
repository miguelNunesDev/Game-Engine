import { Context, Size, Vector } from "../Types/types";
import { Entity } from "./Entity.js";

export class Square extends Entity {
    stroke: String | Boolean
    fill: String | Boolean
    style: String
    constructor(pos: Vector, size: Size, parent?: Entity, stroke?: String, fill?: String) {
        super(pos, size, parent);
        this.stroke = stroke || false;
        this.fill = fill || false;
        this.style = 'solid';
        this.visible = false;
    }
    render(ctx: Context): void {
        if (this.style == 'dashed') {
            ctx.setLineDash([5, 5]);
            
        }
        ctx.beginPath();
        
        ctx.rect(
            this.position.world.x,
            this.position.world.y,
            this.size.w,
            this.size.h
        );
       
        if (this.stroke) {
            ctx.strokeStyle = this.stroke as string;
            ctx.stroke();
        }
        if (this.fill) {
            ctx.fillStyle = this.fill as string
            ctx.fill();
        };
        ctx.setLineDash([])

    }
}