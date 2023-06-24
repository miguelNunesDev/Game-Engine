var Space;
(function (Space) {
    Space[Space["WORLD"] = 0] = "WORLD";
    Space[Space["LOCAL"] = 1] = "LOCAL";
})(Space || (Space = {}));
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (y === void 0) { y = false; }
        this.x = x;
        this.y = y !== false ? y : x;
    }
    Vector.add = function (p1, p2) {
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
    };
    Vector.sub = function (p1, p2) {
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
    };
    Vector.mult = function (p1, p2) {
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
    };
    Vector.div = function (p1, p2) {
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
    };
    Vector.is = function (v) { return v.x; };
    ;
    Vector.mod = function (p1, p2) {
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
    };
    Vector.zero = function () { return new Vector(0, 0); };
    Vector.one = function () { return new Vector(1, 1); };
    return Vector;
}());
var Size = /** @class */ (function () {
    function Size(w, h) {
        if (h === void 0) { h = false; }
        this.w = w;
        this.h = h !== false ? h : w;
    }
    Size.add = function (p1, p2) {
        return {
            w: p1.w + p2.w,
            h: p1.h + p2.h,
        };
    };
    Size.sub = function (p1, p2) {
        return {
            w: p1.w - p2.w,
            h: p1.h - p2.h,
        };
    };
    Size.mult = function (p1, p2) {
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
    };
    Size.div = function (p1, p2) {
        return {
            w: p1.w / p2.w,
            h: p1.h / p2.h,
        };
    };
    Size.mod = function (p1, p2) {
        return {
            w: p1.w % p2.w,
            h: p1.h % p2.h,
        };
    };
    Size.zero = function () { return new Size(0, 0); };
    return Size;
}());
var ActionState;
(function (ActionState) {
    ActionState[ActionState["HOVER"] = 0] = "HOVER";
    ActionState[ActionState["CLICKED"] = 1] = "CLICKED";
    ActionState[ActionState["RESTING"] = 2] = "RESTING";
})(ActionState || (ActionState = {}));
var MouseState;
(function (MouseState) {
    MouseState[MouseState["L_UP"] = 0] = "L_UP";
    MouseState[MouseState["L_DOWN"] = 1] = "L_DOWN";
    MouseState[MouseState["R_UP"] = 2] = "R_UP";
    MouseState[MouseState["R_DOWN"] = 3] = "R_DOWN";
    MouseState[MouseState["MOVE"] = 4] = "MOVE";
    MouseState[MouseState["IDLE"] = 5] = "IDLE";
    MouseState[MouseState["LEAVE"] = 6] = "LEAVE";
    MouseState[MouseState["DRAG"] = 7] = "DRAG";
})(MouseState || (MouseState = {}));
export { Vector, ActionState, MouseState, Size, Space };
