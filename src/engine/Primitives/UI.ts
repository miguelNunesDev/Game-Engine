import { UIManager } from "../Managers/UiManager.js";
import { Transform } from "../Modules/Transform.js";
import { TransformData } from "../Types/transform.js";
import { Context, UID } from "../Types/types.js";

abstract class UI {
    transform: Transform
    visible: Boolean
    protected _UID: UID
    constructor(transform: TransformData) {
        this.transform = new Transform(transform);
        this.visible = true;
        this._UID = UIManager.getInstance().register(this);
    }
    render(ctx: Context) { }
}
class UIText extends UI {
    constructor(public content: string, transform: TransformData, public style: { family: string }) {
        super(transform)
    }
    toUppercase() {
        this.content = this.content.toUpperCase();
    }
    render(ctx: Context) {
        ctx.fillStyle = 'gray';
        ctx.font = `${this.transform.size.w}px ${this.style.family}`;
        ctx.fillText(this.content, this.transform.position.x, this.transform.position.y);
    }
}

export {
    UI, UIText
}
