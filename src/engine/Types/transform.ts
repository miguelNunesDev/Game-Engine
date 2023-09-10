
abstract class NumTupleHelper {
    constructor() { }
    // STATICS
    static add(p1: [number, number], p2: [number, number]): [number, number] {
        return [p1[0] + p2[0], p1[1] + p2[1]]
    }
    static sub(p1: [number, number], p2: [number, number]): [number, number] {
        return [p1[0] - p2[0], p1[1] - p2[1]]
    }
    static mult(p1: [number, number], p2: [number, number]): [number, number] {
        return [p1[0] * p2[0], p1[1] * p2[1]]
    }
    static div(p1: [number, number], p2: [number, number]): [number, number] {
        return [p1[0] / p2[0], p1[1] / p2[1]]
    }
    static mod(p1: [number, number], p2: [number, number]): [number, number] {
        return [p1[0] % p2[0], p1[1] % p2[1]]
    }
    static pow(p1: [number, number], p2: [number, number]): [number, number] {
        return [Math.pow(p1[0], p2[0]), Math.pow(p1[1], p2[1])]
    }
    // STATICS END
}

abstract class NumTuple {
    constructor(protected first: number, protected second?: number) {
        this.second = second ?? first;
    }

    add(p: NumTuple): void;
    add(p: number): void;
    add(p: [number, number]): void;
    add(p: NumTuple | number | [number, number]): void {
        if (typeof p === 'number') {
            this.first += p;
            this.second += p;
            return
        }
        if (Array.isArray(p)) {
            this.first += p[0];
            this.second += p[1];
            return
        }
        this.first += p.first;
        this.second += p.second;
    }
    sub(p: NumTuple): void;
    sub(p: number): void;
    sub(p: [number, number]): void;
    sub(p: NumTuple | number | [number, number]): void {
        if (typeof p === 'number') {
            this.first -= p;
            this.second -= p;
            return
        }
        if (Array.isArray(p)) {
            this.first -= p[0];
            this.second -= p[1];
            return
        }
        this.first -= p.first;
        this.second -= p.second;
    }
    mult(p: NumTuple): void;
    mult(p: number): void;
    mult(p: [number, number]): void;
    mult(p: NumTuple | number | [number, number]): void {
        if (typeof p === 'number') {
            this.first *= p;
            this.second *= p;
            return
        }
        if (Array.isArray(p)) {
            this.first *= p[0];
            this.second *= p[1];
            return
        }
        this.first *= p.first;
        this.second *= p.second;
    }
    div(p: NumTuple): void;
    div(p: number): void;
    div(p: [number, number]): void;
    div(p: NumTuple | number | [number, number]): void {
        if (typeof p === 'number') {
            this.first /= p;
            this.second /= p;
            return
        }
        if (Array.isArray(p)) {
            this.first /= p[0];
            this.second /= p[1];
            return
        }
        this.first /= p.first;
        this.second /= p.second;
    }
    mod(p: NumTuple): void;
    mod(p: number): void;
    mod(p: [number, number]): void;
    mod(p: NumTuple | number | [number, number]): void {
        if (typeof p === 'number') {
            this.first %= p;
            this.second %= p;
            return
        }
        if (Array.isArray(p)) {
            this.first %= p[0];
            this.second %= p[1];
            return
        }
        this.first %= p.first;
        this.second %= p.second;
    }
    pow(power: number) {
        this.first = Math.pow(this.first, power);
        this.second = Math.pow(this.second, power);
    }
    fixed(decimals: number) {
        this.first = Number(this.first.toFixed(decimals));
        this.second = Number(this.second.toFixed(decimals));
        return this;
    }
    get raw(): [number, number] {
        return [this.first, this.second];
    }
}

class Vector extends NumTuple {
    constructor(x: number | [number, number], y?: number) {
        if (Array.isArray(x)) {
            super(x[0], x[1]);
        } else {
            super(x, y);
        }
    }
    get x() { return this.first }
    set x(x: number) { this.first = x }

    get y() { return this.second }
    set y(y: number) { this.second = y }

    static zero = new Vector(0, 0);
    static one = new Vector(1, 1);
    // STATIC
    static add(p1: Vector, p2: Vector): Vector;
    static add(p1: Vector, p2: number): Vector;
    static add(p1: Vector, p2: [number, number]): Vector;
    static add(p1: Vector, p2: Vector | number | [number, number]): Vector {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.add(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.add(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.add(p1.raw, [p2, p2]))
    }
    static sub(p1: Vector, p2: Vector): Vector;
    static sub(p1: Vector, p2: number): Vector;
    static sub(p1: Vector, p2: [number, number]): Vector;
    static sub(p1: Vector, p2: Vector | number | [number, number]): Vector {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.sub(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.sub(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.sub(p1.raw, [p2, p2]))
    }
    static mult(p1: Vector, p2: Vector): Vector;
    static mult(p1: Vector, p2: number): Vector;
    static mult(p1: Vector, p2: [number, number]): Vector;
    static mult(p1: Vector, p2: Vector | number | [number, number]): Vector {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.mult(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.mult(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.mult(p1.raw, [p2, p2]))
    }
    static div(p1: Vector, p2: Vector): Vector;
    static div(p1: Vector, p2: number): Vector;
    static div(p1: Vector, p2: [number, number]): Vector;
    static div(p1: Vector, p2: Vector | number | [number, number]): Vector {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.div(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.div(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.div(p1.raw, [p2, p2]))
    }
    static mod(p1: Vector, p2: Vector): Vector;
    static mod(p1: Vector, p2: number): Vector;
    static mod(p1: Vector, p2: [number, number]): Vector;
    static mod(p1: Vector, p2: Vector | number | [number, number]): Vector {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.mod(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.mod(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.mod(p1.raw, [p2, p2]))
    }
    static pow(p1: Vector, p2: Vector): Vector;
    static pow(p1: Vector, p2: number): Vector;
    static pow(p1: Vector, p2: [number, number]): Vector;
    static pow(p1: Vector, p2: Vector | number | [number, number]): Vector {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.pow(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.pow(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.pow(p1.raw, [p2, p2]))
    }
    static is(v: any): v is Vector { return v.x }
    // STACTIC END
    get magnitude() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) }
    get normalize() { return Vector.div(this, this.magnitude) }
    set magnitude(magnitude: number) {
        const scale = magnitude / this.magnitude;
        this.mult(scale);
    }
}

class Size extends NumTuple {
    constructor(w: number | [number, number], h?: number) {
        if (Array.isArray(w)) {
            super(w[0], w[1]);
        } else {
            super(w, h);
        }
    }
    get w() { return this.first }
    set w(w: number) { this.first = w }

    get h() { return this.second }
    set h(h: number) { this.second = h }

    static zero = new Size(0, 0);
    static one = new Size(1, 1);
    // STATIC
    static add(p1: Size, p2: Size): Size;
    static add(p1: Size, p2: number): Size;
    static add(p1: Size, p2: [number, number]): Size;
    static add(p1: Size, p2: Size | number | [number, number]): Size {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.add(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.add(p1.raw, p2));
        }
        return new Size(NumTupleHelper.add(p1.raw, [p2, p2]))
    }
    static sub(p1: Size, p2: Size): Size;
    static sub(p1: Size, p2: number): Size;
    static sub(p1: Size, p2: [number, number]): Size;
    static sub(p1: Size, p2: Size | number | [number, number]): Size {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.sub(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.sub(p1.raw, p2));
        }
        return new Size(NumTupleHelper.sub(p1.raw, [p2, p2]))
    }
    static mult(p1: Size, p2: Size): Size;
    static mult(p1: Size, p2: number): Size;
    static mult(p1: Size, p2: [number, number]): Size;
    static mult(p1: Size, p2: Size | number | [number, number]): Size {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.mult(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.mult(p1.raw, p2));
        }
        return new Size(NumTupleHelper.mult(p1.raw, [p2, p2]))
    }
    static div(p1: Size, p2: Size): Size;
    static div(p1: Size, p2: number): Size;
    static div(p1: Size, p2: [number, number]): Size;
    static div(p1: Size, p2: Size | number | [number, number]): Size {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.div(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.div(p1.raw, p2));
        }
        return new Size(NumTupleHelper.div(p1.raw, [p2, p2]))
    }
    static mod(p1: Size, p2: Size): Size;
    static mod(p1: Size, p2: number): Size;
    static mod(p1: Size, p2: [number, number]): Size;
    static mod(p1: Size, p2: Size | number | [number, number]): Size {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.mod(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.mod(p1.raw, p2));
        }
        return new Size(NumTupleHelper.mod(p1.raw, [p2, p2]))
    }
    static pow(p1: Size, p2: Size): Size;
    static pow(p1: Size, p2: number): Size;
    static pow(p1: Size, p2: [number, number]): Size;
    static pow(p1: Size, p2: Size | number | [number, number]): Size {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.pow(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.pow(p1.raw, p2));
        }
        return new Size(NumTupleHelper.pow(p1.raw, [p2, p2]))
    }
    // STACTIC END
}


type TransformData = {
    position?: Vector,
    size?: Size,
    rotation?: number,
    corners?: { [anchor in Exclude<Anchor, Vector>]: Vector }
}
type Anchor =
    'center'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | Vector
export {
    TransformData,
    Anchor,
    Vector,
    Size
}