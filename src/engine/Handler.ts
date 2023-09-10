import { Circle } from "./Primitives/Circle.js";
import { Square } from "./Primitives/Square.js";
import { Entity } from "./Primitives/Entity.js";
import { Container, Context, CursorState, HandlerState, Size, Vector } from "./Types/types.js";
import { CollisionManager } from "./Managers/CollisionManager.js";
import { Cursor } from "./Primitives/Cursor.js";
import { Game } from "./Game.js";



export class Handler extends Entity {
    shape: Entity
    stroke: string
    collider: CollisionManager
    cursor: Cursor
    private _on: { [key in HandlerState]: Array<Function> }
    constructor(pos: Vector, size: Size, parent: Container, shape: string = 'circle', stroke?: string) {
        const position = new Vector(
            pos.x - size.w * 0.5,
            pos.y - size.h * 0.5
        );
        super({position, size}, parent);
        this.stroke = stroke || 'red';
        this.shape = this.getShape(shape);
        this.collider = CollisionManager.getInstance();
        this.cursor = Cursor.getInstance();
        this._on = {
            clicked: [],
            hover: [],
            resting: []
        }
        this.initStateChecker();

    }
    initStateChecker() {
        // this.cursor.onEntityClick(this, () => {
        //     Game.WINDOW.requestAnimationFrame(() => {
        //         this.transform.center = this.cursor.transform.position;

        //         if (!this._on['clicked'].length) return;
        //         this._on['clicked'].forEach((cb: Function) => { cb() })
        //     })
        // })
        // this.cursor.onEntityHover(this, () => {
        //     console.log('hover');
        //     console.log(this.transform.position);
        //     console.log(this.cursor.transform.position);



        // })
    }
    getShape(shape: String) {
        const formType = {
            circle: (): Circle => { return new Circle(this.transform.center.x,this.transform.center.y, this.transform.size.w * 0.5, {}, this) },
            square: (): Square => { return new Square({ position: this.transform.position, size: this.transform.size, rotation: 0 }, this, this.stroke, 'white') }
        }

        const shapeFunc: Function = formType[shape as keyof object];
        return shapeFunc();

    }
    on(state: HandlerState, cb: Function) {
        this._on[state].push(cb)
    }
    render(ctx: Context): void {
        this.shape.render(ctx);
    }

}