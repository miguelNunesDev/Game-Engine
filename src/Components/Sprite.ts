import { Entity } from "../Primitives/Entity.js";
import { Container, Context, Image, Size, Vector } from "../Types/types.js";

export class Sprite extends Entity {
    asset: Image
    constructor(asset: Image, pos?: Vector, size?: Size, parent?: Container) {
        super(pos, size, 0, parent)
        this.asset = asset
    }
    render(ctx: Context): void {
        ctx.drawImage(this.asset, this.transform.position.x, this.transform.position.y, this.transform.size.w, this.transform.size.h)
    }
}