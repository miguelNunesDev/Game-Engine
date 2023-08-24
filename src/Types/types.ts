import { Containable } from "../Modules/Containable";
import { Transform } from "../Modules/Transform";

type UID = number;
type Magnitude = number;
type Rad = number;
type Angle = 'degre' | 'radian'

type Panel = {
    element: HTMLElement,
    content: Array<string>
}
type Container = { container: Containable, visibility?: boolean, transform: Transform }

type TileSize = number;

type IsoMap = {
    grid: Array<string>,
    size: Size,
    tileCode: {}
}
type Space = "world" | "local";

type Image = CanvasImageSource

type boundingBox = {
    position: Vector
    size: Size
}
type localVector = Vector;
type worldVector = Vector;

class Vector {
    x: number;
    y: number;
    constructor(x: number, y?: number) {
        this.x = x;
        this.y = y ?? x;
    }
    static zero = new Vector(0, 0);
    static one = new Vector(1, 1);

    static add(p1: Vector, p2: Vector): Vector;
    static add(p1: Vector, p2: number): Vector;
    static add(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return new Vector(p1.x + p2, p1.y + p2)
        }
        return new Vector(p1.x + p2.x, p1.y + p2.y)

    }

    static sub(p1: Vector, p2: Vector): Vector;
    static sub(p1: Vector, p2: number): Vector;
    static sub(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return new Vector(p1.x - p2, p1.y - p2)
        }
        return new Vector(p1.x - p2.x, p1.y - p2.y)
    }
    static mult(p1: Vector, p2: Vector): Vector;
    static mult(p1: Vector, p2: number): Vector;
    static mult(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return new Vector(p1.x * p2, p1.y * p2)
        }
        return new Vector(p1.x * p2.x, p1.y * p2.y)
    }
    static div(p1: Vector, p2: Vector): Vector;
    static div(p1: Vector, p2: number): Vector;
    static div(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return new Vector(p1.x / p2, p1.y / p2)
        }
        return new Vector(p1.x / p2.x, p1.y / p2.y)
    }
    static is(v: any): v is Vector { return v.x };

    static mod(p1: Vector, p2: Vector): Vector;
    static mod(p1: Vector, p2: number): Vector;
    static mod(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return new Vector(p1.x % p2, p1.y % p2)
        }
        return new Vector(p1.x % p2.x, p1.y % p2.y)
    }

    fixed(decimals: number): Vector {
        this.x = Number(this.x.toFixed(decimals));
        this.y = Number(this.y.toFixed(decimals));
        return this;
    }
}

class Size {
    constructor(public w: number, public h?: number) { this.h = h ?? w; }

    static zero = new Size(0, 0);
    static one = new Size(1, 1);

    static add(p1: Size, p2: Size): Size;
    static add(p1: Size, p2: number): Size;
    static add(p1: Size, p2: Size | number) {
        if (typeof p2 === "number") {
            return new Size(p1.w + p2, p1.h + p2);
        }
        return new Size(p1.w + p2.w, p1.h + p2.h);
    }
    static sub(p1: Size, p2: Size): Size;
    static sub(p1: Size, p2: number): Size;
    static sub(p1: Size, p2: Size | number) {
        if (typeof p2 === "number") {
            return new Size(p1.w - p2, p1.h - p2);
        }
        return new Size(p1.w - p2.w, p1.h - p2.h);
    }
    static mult(p1: Size, p2: Size): Size;
    static mult(p1: Size, p2: number): Size;
    static mult(p1: Size, p2: Size | number): Size {
        if (typeof p2 === "number") {
            return new Size(p1.w * p2, p1.h * p2);
        }
        return new Size(p1.w * p2.w, p1.h * p2.h);
    }
    static div(p1: Size, p2: Size): Size;
    static div(p1: Size, p2: number): Size;
    static div(p1: Size, p2: Size | number): Size {
        if (typeof p2 === "number") {
            return new Size(p1.w / p2, p1.h / p2);
        }
        return new Size(p1.w / p2.w, p1.h / p2.h);
    }
    static mod(p1: Size, p2: Size): Size;
    static mod(p1: Size, p2: number): Size;
    static mod(p1: Size, p2: Size | number): Size {
        if (typeof p2 === "number") {
            return new Size(p1.w % p2, p1.h % p2);
        }
        return new Size(p1.w % p2.w, p1.h % p2.h);
    }

    fixed(decimals: number): Size {
        this.w = Number(this.w.toFixed(decimals));
        this.h = Number(this.h.toFixed(decimals));
        return this;
    }
}

type HandlerState = 'hover' | 'clicked' | "resting";

type CursorType = "touch" | "mouse";

enum CursorState {
    PRIMARY_DOWN,
    PRIMARY_UP,
    SECONDARY_DOWN,
    SECONDARY_UP,
    MOVE,
    IDLE,
    DRAG,
    LEAVE,
}
type TransformEvents = 'change' | 'position' | 'rotate' | 'scale'

type Context = CanvasRenderingContext2D;
type Canvas = HTMLCanvasElement;

export {
    TransformEvents,
    Vector,
    HandlerState,
    CursorType,
    CursorState,
    Context,
    Canvas,
    Size,
    Panel,
    UID,
    Space,
    Magnitude,
    Rad,
    boundingBox,
    localVector,
    worldVector,
    Image,
    IsoMap,
    TileSize,
    Container,
    Angle
}