import { CollisionManager } from "../Managers/CollisionManager.js";
import { SceneManager } from "../Managers/SceneManager.js";
import { Level } from "../Components/Level.js";
import { Canvas, Vector, MouseState } from "../Types/types.js";
import { Circle } from "./Circle.js";
import { Entity } from "./Entity.js";
import { CameraManager } from "../Managers/CameraManager.js";
import { TimeManager } from "../Managers/TimeManager.js";

export class Cursor extends Entity {
    lastPosition: Vector;
    state: MouseState;
    actions: { [key in keyof typeof MouseState as number]: Array<Function> };
    deltaPosition: Vector;
    debugShape: Entity;
    canvas: Canvas
    private _absolutePosition: Vector
    private _collider: CollisionManager
    private _targetID: number | boolean
    static _instance: Cursor
    private constructor(canvas: Canvas) {
        super();
        this._collider = CollisionManager.getInstance()
        this.lastPosition = Vector.zero();
        this.state = MouseState.IDLE;
        this.canvas = canvas;
        this.actions = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: []
        };
        this._targetID = false;
        this.deltaPosition = Vector.zero();
        this._absolutePosition = Vector.zero();
        this.debugShape = new Circle(this.position.world, 5, this);
        this.initListeners(this.canvas);
    }
    public static getInstance(canvas: Canvas | boolean = false): Cursor {
        if (!Cursor._instance) {
            Cursor._instance = new Cursor(canvas as Canvas);
        }
        return Cursor._instance;
    }

    initListeners(canvas: Canvas) {

        canvas.addEventListener('mousedown', () => {
            console.log('MOUSE DOWN');

            this.state = MouseState.L_DOWN;
            if (!this.actions[MouseState.L_DOWN].length) return;
            this.actions[MouseState.L_DOWN].forEach((func: Function) => {
                func();
            })
        })
        canvas.addEventListener('touchstart', (e) => {
            
            this.state = MouseState.L_DOWN;
            if (!this.actions[MouseState.L_DOWN].length) return;
            this.actions[MouseState.L_DOWN].forEach((func: Function) => {
                func();
            })
        }, { passive: false })
        // canvas.addEventListener('touchmove', () => {
        //     this.state = MouseState.DRAG;
        //     this.actions[MouseState.DRAG].forEach(action => {
        //         action();
        //     });
        // }, { passive: false })
        canvas.addEventListener('touchend', () => {
            this.state = MouseState.L_UP;
            this.actions[MouseState.L_UP].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('dragstart', (e) => {
            e.preventDefault();
            this.state = MouseState.L_DOWN;
            this.actions[MouseState.L_DOWN].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('dragend', () => {
            this.state = MouseState.L_UP;
            this.actions[MouseState.L_UP].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('mouseleave', () => {
            this.state = MouseState.LEAVE;
            if (!this.actions[MouseState.LEAVE].length) return;
            this.actions[MouseState.LEAVE].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('mouseup', () => {
            this.state = MouseState.L_UP;
            if (!this.actions[MouseState.L_UP].length) return;

            this.actions[MouseState.L_UP].forEach(action => {
                action();
            });
        })

        canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const camera = CameraManager.getInstance().current;
            this.lastPosition = this.lastPosition || this.position.world;
            this._absolutePosition = new Vector(
                e.clientX - rect.left,
                e.clientY - rect.top
            )
            const localPosition = Vector.add(this._absolutePosition, camera.position)
            requestAnimationFrame(() => {
                this.deltaPosition = Vector.sub(localPosition, this.lastPosition);
                this.lastPosition = localPosition;
                this.setPosition(localPosition)
            })

            if (!this.actions[MouseState.MOVE].length) return;
            this.actions[MouseState.MOVE].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('touchmove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const camera = CameraManager.getInstance().current;
            this.lastPosition = this.lastPosition || this.position.world;
            this._absolutePosition = new Vector(
                e.touches[0].clientX - rect.left,
                e.touches[0].clientY - rect.top
            )
            const localPosition = Vector.add(this._absolutePosition, camera.position)
            requestAnimationFrame(() => {
                this.deltaPosition = Vector.sub(localPosition, this.lastPosition);
                this.lastPosition = localPosition;
                this.setPosition(localPosition)
            })
            console.log(localPosition);
            

            if (!this.actions[MouseState.MOVE].length) return;
            this.actions[MouseState.MOVE].forEach(action => {
                action();
            });
        })
    }
    on(type: MouseState, f: Function) {
        this.actions[type].push(f);
    }
    get targetID() { return this._targetID }
    onEntityClick(entity: Entity, f: Function) {
        this._collider.listen(this, entity, () => {
            if (this.state !== MouseState.L_DOWN) return;
            const colliding = this._collider.check(this, entity);
            const validTarget = this._targetID === false || this._targetID === entity.uid;
            if (colliding && validTarget) {
                this._targetID = entity.uid;
                f()
            }
        })
        this.on(MouseState.L_UP, () => {
            this._targetID = false;
        })
    }
    onEntityHover(entity: Entity, f: Function) {
        this._collider.listen(this, entity, f)
    }
}