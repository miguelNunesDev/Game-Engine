import { Circle } from "./Primitives/Circle.js";
import { Square } from "./Primitives/Square.js";
import { Entity } from "./Primitives/Entity.js";
import { ActionState, Context, MouseState, Size, Vector } from "./Types/types.js";
import { CollisionManager } from "./Managers/CollisionManager.js";
import { Cursor } from "./Primitives/Cursor.js";
import { Game } from "./Game.js";



export class Handler extends Entity {
    shape: Entity
    stroke: string
    collider: CollisionManager
    cursor: Cursor
    private _on: { [key in keyof typeof ActionState as number]: Array<Function> }
    constructor(pos: Vector, size: Size, parent: Entity, shape: string = 'circle', stroke?: string) {
        const position = new Vector(
            pos.x - size.w * 0.5,
            pos.y - size.h * 0.5
        );
        super(position, size, parent);
        this.stroke = stroke || 'red';
        this.shape = this.getShape(shape);
        this.collider = CollisionManager.getInstance();
        this.cursor = Cursor.getInstance();
        this._on = {
            0: [],
            1: [],
        }
        this.initStateChecker();

    }
    initStateChecker() {
        this.cursor.onEntityClick(this, () => {
            Game.WINDOW.requestAnimationFrame(() => {
                this.center = this.cursor.position.world;

                if (!this._on[ActionState.CLICKED].length) return;
                this._on[ActionState.CLICKED].forEach((cb: Function) => { cb() })
            })
        })
        this.cursor.onEntityHover(this, () => {
            console.log('hover');
            console.log(this.position.world);
            console.log(this.cursor.position.world);
            
            
            
        })
    }
    getShape(shape: String) {
        const formType = {
            circle: (): Circle => { return new Circle(this.center, this.size.w * 0.5, this, this.stroke, 'white') },
            square: (): Square => { return new Square(this.position.world, this.size, this, this.stroke, 'white') }
        }

        const shapeFunc: Function = formType[shape as keyof object];
        return shapeFunc();

    }
    on(state: ActionState, cb: Function) {
        this._on[state].push(cb)
    }
    render(ctx: Context): void {
        this.shape.render(ctx);
    }

}