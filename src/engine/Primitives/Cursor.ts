import { CollisionManager } from "../Managers/CollisionManager.js";
import { Canvas, Vector, CursorState, CursorType, Size, Context } from "../Types/types.js";
import { createObjectFromEnum, isTouchDevice } from "../Helper.js";
import { Transform } from "../Modules/Transform.js";

type CursorAction = {
    [i in CursorType]: {
        [key in CursorState]: Array<Function>;
    };
};

export class Cursor {
    lastPosition: Vector;
    state: CursorState;
    actions: CursorAction;
    deltaPosition: Vector;
    canvas: Canvas
    private _absolutePosition: Vector
    private _collider: CollisionManager
    private _targetID: number | boolean
    private _type: CursorType
    static _instance: Cursor
    readonly transform: Transform
    private constructor(canvas: Canvas) {
    
        // super(Vector.zero, Size.zero, 0);
        this._collider = CollisionManager.getInstance()
        this.transform = new Transform({})
        this.lastPosition = Vector.zero;
        this.state = CursorState.IDLE;
        this.canvas = canvas;
        this.actions = {
            mouse: createObjectFromEnum(CursorState),
            touch: createObjectFromEnum(CursorState),
        };
        this._targetID = false;
        this.deltaPosition = Vector.zero;
        this._absolutePosition = Vector.zero;
        this.initListeners(this.canvas);
        this._type = isTouchDevice() ? 'touch' : 'mouse'
    }
    public static getInstance(canvas?: Canvas): Cursor {
        
        if (!Cursor._instance && !canvas) console.error('No context provided');

        Cursor._instance = Cursor._instance
            ? Cursor._instance
            : new Cursor(canvas);

        return Cursor._instance
    }
    initListeners(canvas: Canvas) {

        document.addEventListener('mousedown', () => {
            console.log('MOUSE DOWN');

            this.state = CursorState.PRIMARY_DOWN;
            if (!this.actions['mouse'][CursorState.PRIMARY_DOWN].length) return;
            this.actions['mouse'][CursorState.PRIMARY_DOWN].forEach((func: Function) => {
                func();
            })
        })
        document.addEventListener('touchstart', (e) => {

            this.state = CursorState.PRIMARY_DOWN;
            if (!this.actions['touch'][CursorState.PRIMARY_DOWN].length) return;
            this.actions['touch'][CursorState.PRIMARY_DOWN].forEach((func: Function) => {
                func();
            })
        }, { passive: false })
        // document.addEventListener('touchmove', () => {
        //     this.state = CursorState.DRAG;
        //     this.actions[CursorState.DRAG].forEach(action => {
        //         action();
        //     });
        // }, { passive: false })
        document.addEventListener('touchend', () => {
            this.state = CursorState.PRIMARY_UP;
            this.actions['touch'][CursorState.PRIMARY_UP].forEach(action => {
                action();
            });
        })
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
            this.state = CursorState.PRIMARY_DOWN;
            this.actions['touch'][CursorState.PRIMARY_DOWN].forEach(action => {
                action();
            });
        })
        document.addEventListener('dragend', () => {
            this.state = CursorState.PRIMARY_UP;
            this.actions['touch'][CursorState.PRIMARY_UP].forEach(action => {
                action();
            });
        })
        document.addEventListener('mouseleave', () => {
            this.state = CursorState.LEAVE;
            if (!this.actions['mouse'][CursorState.LEAVE].length) return;
            this.actions['mouse'][CursorState.LEAVE].forEach(action => {
                action();
            });
        })
        document.addEventListener('mouseup', () => {
            this.state = CursorState.PRIMARY_UP;
            if (!this.actions['mouse'][CursorState.PRIMARY_UP].length) return;

            this.actions['mouse'][CursorState.PRIMARY_UP].forEach(action => {
                action();
            });
        })

        document.addEventListener('mousemove', (e) => {


            this.transform.position = this.getAbsolutePosition(e);


            if (!this.actions['mouse'][CursorState.MOVE].length) return;
            this.actions['mouse'][CursorState.MOVE].forEach(action => {
                action();
            });
        })
        canvas.addEventListener('touchmove', (e) => {
        })
    }
    on(state: CursorState, f: Function, type?: CursorType) {
        this.actions[type || this._type][state].push(f);
    }
    getAbsolutePosition(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return new Vector(
            e.clientX - rect.left,
            e.clientY - rect.top
        )
    }
}