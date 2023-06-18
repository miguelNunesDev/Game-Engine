import { Entity } from "../Primitives/Entity.js";
import { Context, Image, Size, Vector } from "../Types/types.js";

export class Sprite extends Entity {
    asset: Image
    constructor(asset: Image, pos?: Vector, size?: Size, parent?: Entity) {
        super(pos, size, parent)
        this.asset = asset
    }
    render(ctx: Context): void {
        ctx.drawImage(this.asset,this.position.world.x, this.position.world.y)
    }
}