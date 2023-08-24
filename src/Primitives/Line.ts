import { abs, degToRad } from "../Helper.js"
import { Vector, Magnitude, Rad, Size, Context, Container } from "../Types/types.js"
import { Entity } from "./Entity.js"

export class Line extends Entity {
    private _pi: Vector
    private _pf: Vector
    public color: string
    public style: string
    constructor(p1: Vector, p2: Vector | Magnitude, angle?: number, parent?: Container, color: string = 'gray') {

        let pf = p2 as Vector;
        if (!Vector.is(p2) && typeof angle !== "boolean") {
            const rad: Rad = degToRad(angle);

            pf = new Vector(
                p1.x + (Math.cos(rad) * p2),
                p1.y + (Math.sin(rad) * p2),
            )

        }
        const pos = new Vector(
            p1.x < pf.x ? p1.x : pf.x,
            p1.y < pf.y ? p1.y : pf.y
        )

        const size = new Size(
            abs(pf.x - p1.x),
            abs(pf.y - p1.y)
        )

        super(pos, size, angle, parent);
        this.color = color;
        this.style = 'solid';
        this._pi = p1
        this._pf = pf


    }
    set pf(pos: Vector) {
        const deltaPos = Vector.sub(this._pf, pos);
        this.transform.center = Vector.add(this.transform.center, deltaPos);
        this._pf = pos;
    }
    set pi(pos: Vector) {
        const deltaPos = Vector.sub(this._pi, pos);
        this.transform.center = Vector.add(this.transform.center, deltaPos);
        this._pi = pos;
    }
    get pi() { return this._pi }
    get pf() { return this._pf }
    setPosition(pos: Vector): void {
        this.transform.position = pos;
        this._pi = pos;
        this._pf = new Vector(
            this._pi.x + this.transform.size.w,
            this._pi.y + this.transform.size.h
        );

    }
    render(ctx: Context): void {
        if (this.style == 'dashed') {
            ctx.setLineDash([10, 10]);

        }
        ctx.beginPath();
        ctx.moveTo(this._pi.x, this._pi.y);
        ctx.lineTo(this._pf.x, this._pf.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.setLineDash([])
    }
}
