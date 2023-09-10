var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y !== null && y !== void 0 ? y : x;
    }
    Vector.prototype.add = function (p) {
        this.x += p.x;
        this.y += p.y;
    };
    Vector.add = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Vector(p1.x + p2, p1.y + p2);
        }
        return new Vector(p1.x + p2.x, p1.y + p2.y);
    };
    Vector.prototype.sub = function (p) {
        this.x -= p.x;
        this.y -= p.y;
    };
    Vector.sub = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Vector(p1.x - p2, p1.y - p2);
        }
        return new Vector(p1.x - p2.x, p1.y - p2.y);
    };
    Vector.prototype.mult = function (p) {
        this.x *= p.x;
        this.y *= p.y;
    };
    Vector.mult = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Vector(p1.x * p2, p1.y * p2);
        }
        return new Vector(p1.x * p2.x, p1.y * p2.y);
    };
    Vector.prototype.div = function (p) {
        this.x /= p.x;
        this.y /= p.y;
    };
    Vector.div = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Vector(p1.x / p2, p1.y / p2);
        }
        return new Vector(p1.x / p2.x, p1.y / p2.y);
    };
    Vector.is = function (v) { return v.x; };
    ;
    Vector.prototype.mod = function (p) {
        this.x %= p.x;
        this.y %= p.y;
    };
    Vector.mod = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Vector(p1.x % p2, p1.y % p2);
        }
        return new Vector(p1.x % p2.x, p1.y % p2.y);
    };
    Vector.prototype.fixed = function (decimals) {
        this.x = Number(this.x.toFixed(decimals));
        this.y = Number(this.y.toFixed(decimals));
        return this;
    };
    Vector.zero = new Vector(0, 0);
    Vector.one = new Vector(1, 1);
    return Vector;
}());
var Size = /** @class */ (function () {
    function Size(w, h) {
        this.w = w;
        this.h = h;
        this.h = h !== null && h !== void 0 ? h : w;
    }
    Size.add = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Size(p1.w + p2, p1.h + p2);
        }
        return new Size(p1.w + p2.w, p1.h + p2.h);
    };
    Size.sub = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Size(p1.w - p2, p1.h - p2);
        }
        return new Size(p1.w - p2.w, p1.h - p2.h);
    };
    Size.mult = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Size(p1.w * p2, p1.h * p2);
        }
        return new Size(p1.w * p2.w, p1.h * p2.h);
    };
    Size.div = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Size(p1.w / p2, p1.h / p2);
        }
        return new Size(p1.w / p2.w, p1.h / p2.h);
    };
    Size.mod = function (p1, p2) {
        if (typeof p2 === "number") {
            return new Size(p1.w % p2, p1.h % p2);
        }
        return new Size(p1.w % p2.w, p1.h % p2.h);
    };
    Size.prototype.fixed = function (decimals) {
        this.w = Number(this.w.toFixed(decimals));
        this.h = Number(this.h.toFixed(decimals));
        return this;
    };
    Size.zero = new Size(0, 0);
    Size.one = new Size(1, 1);
    return Size;
}());
var CursorState;
(function (CursorState) {
    CursorState[CursorState["PRIMARY_DOWN"] = 0] = "PRIMARY_DOWN";
    CursorState[CursorState["PRIMARY_UP"] = 1] = "PRIMARY_UP";
    CursorState[CursorState["SECONDARY_DOWN"] = 2] = "SECONDARY_DOWN";
    CursorState[CursorState["SECONDARY_UP"] = 3] = "SECONDARY_UP";
    CursorState[CursorState["MOVE"] = 4] = "MOVE";
    CursorState[CursorState["IDLE"] = 5] = "IDLE";
    CursorState[CursorState["DRAG"] = 6] = "DRAG";
    CursorState[CursorState["LEAVE"] = 7] = "LEAVE";
})(CursorState || (CursorState = {}));
export { Vector, CursorState, Size };
