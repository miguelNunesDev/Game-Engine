type UID = number;
type ID = number;
type Magnitude = number;
type Rad = number;
type Panel = {
    element: HTMLElement,
    content: Array<string>
}
type TileSize = number;
type IsoMap = {
    grid: Array<string>,
    size: Size,
    tileCode: {}
}
enum Space {
    WORLD,
    LOCAL,
}
type Image = CanvasImageSource
type boundingBox = {
    position: {
        x: number,
        y: number,
    }
    size: {
        w: number,
        h: number
    }
}
type localVector = Vector;
type worldVector = Vector;
class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number | boolean = false) {
        this.x = x;
        this.y = y !== false ? y as number : x;
    }
    static zero = (): Vector => new Vector(0, 0);
    static one = (): Vector => new Vector(1, 1);

    static add(p1: Vector, p2: Vector): Vector;
    static add(p1: Vector, p2: number): Vector;
    static add(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return {
                x: p1.x + p2,
                y: p1.y + p2,
            };
        }
        return {
            x: p1.x + p2.x,
            y: p1.y + p2.y,
        };

    }
    static sub(p1: Vector, p2: Vector): Vector;
    static sub(p1: Vector, p2: number): Vector;
    static sub(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return {
                x: p1.x - p2,
                y: p1.y - p2,
            };
        }
        return {
            x: p1.x - p2.x,
            y: p1.y - p2.y,
        };
    }
    static mult(p1: Vector, p2: Vector): Vector;
    static mult(p1: Vector, p2: number): Vector;
    static mult(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return {
                x: p1.x * p2,
                y: p1.y * p2,
            };
        }
        return {
            x: p1.x * p2.x,
            y: p1.y * p2.y,
        };
    }
    static div(p1: Vector, p2: Vector): Vector;
    static div(p1: Vector, p2: number): Vector;
    static div(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return {
                x: p1.x / p2,
                y: p1.y / p2,
            };
        }
        return {
            x: p1.x / p2.x,
            y: p1.y / p2.y,
        };
    }
    static is(v: any): v is Vector { return v.x };
    static mod(p1: Vector, p2: Vector): Vector;
    static mod(p1: Vector, p2: number): Vector;
    static mod(p1: Vector, p2: Vector | number): Vector {
        if (typeof p2 === "number") {
            return {
                x: p1.x % p2,
                y: p1.y % p2,
            };
        }
        return {
            x: p1.x % p2.x,
            y: p1.y % p2.y,
        };
    }
}
class Size {
    w: number;
    h: number;
    constructor(w: number, h: number | boolean = false) {
        this.w = w;
        this.h = h !== false ? h as number : w;
    }
    static zero = () => new Size(0, 0);
    static add(p1: Size, p2: Size) {
        return {
            w: p1.w + p2.w,
            h: p1.h + p2.h,
        };
    }
    static sub(p1: Size, p2: Size) {
        return {
            w: p1.w - p2.w,
            h: p1.h - p2.h,
        };
    }
    static mult(p1: Size, p2: Size): Size;
    static mult(p1: Size, p2: number): Size;
    static mult(p1: Size, p2: Size | number): Size {
        if (typeof p2 === "number") {
            return {
                w: p1.w * p2,
                h: p1.h * p2,
            };
        }
        return {
            w: p1.w * p2.w,
            h: p1.h * p2.h,
        };
    }
    static div(p1: Size, p2: Size) {
        return {
            w: p1.w / p2.w,
            h: p1.h / p2.h,
        };
    }
    static mod(p1: Size, p2: Size) {
        return {
            w: p1.w % p2.w,
            h: p1.h % p2.h,
        };
    }
}
enum ActionState {
    HOVER,
    CLICKED,
    RESTING
}
enum MouseState {
    L_UP,
    L_DOWN,
    R_UP,
    R_DOWN,
    MOVE,
    IDLE,
    LEAVE,
    DRAG
}

type Context = CanvasRenderingContext2D;
type Canvas = HTMLCanvasElement;

export {
    Vector,
    ActionState,
    MouseState,
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
    TileSize
}