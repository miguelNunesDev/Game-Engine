var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NumTupleHelper = /** @class */ (function () {
    function NumTupleHelper() {
    }
    // STATICS
    NumTupleHelper.add = function (p1, p2) {
        return [p1[0] + p2[0], p1[1] + p2[1]];
    };
    NumTupleHelper.sub = function (p1, p2) {
        return [p1[0] - p2[0], p1[1] - p2[1]];
    };
    NumTupleHelper.mult = function (p1, p2) {
        return [p1[0] * p2[0], p1[1] * p2[1]];
    };
    NumTupleHelper.div = function (p1, p2) {
        return [p1[0] / p2[0], p1[1] / p2[1]];
    };
    NumTupleHelper.mod = function (p1, p2) {
        return [p1[0] % p2[0], p1[1] % p2[1]];
    };
    NumTupleHelper.pow = function (p1, p2) {
        return [Math.pow(p1[0], p2[0]), Math.pow(p1[1], p2[1])];
    };
    return NumTupleHelper;
}());
var NumTuple = /** @class */ (function () {
    function NumTuple(first, second) {
        this.first = first;
        this.second = second;
        this.second = second !== null && second !== void 0 ? second : first;
    }
    NumTuple.prototype.add = function (p) {
        if (typeof p === 'number') {
            this.first += p;
            this.second += p;
            return;
        }
        if (Array.isArray(p)) {
            this.first += p[0];
            this.second += p[1];
            return;
        }
        this.first += p.first;
        this.second += p.second;
    };
    NumTuple.prototype.sub = function (p) {
        if (typeof p === 'number') {
            this.first -= p;
            this.second -= p;
            return;
        }
        if (Array.isArray(p)) {
            this.first -= p[0];
            this.second -= p[1];
            return;
        }
        this.first -= p.first;
        this.second -= p.second;
    };
    NumTuple.prototype.mult = function (p) {
        if (typeof p === 'number') {
            this.first *= p;
            this.second *= p;
            return;
        }
        if (Array.isArray(p)) {
            this.first *= p[0];
            this.second *= p[1];
            return;
        }
        this.first *= p.first;
        this.second *= p.second;
    };
    NumTuple.prototype.div = function (p) {
        if (typeof p === 'number') {
            this.first /= p;
            this.second /= p;
            return;
        }
        if (Array.isArray(p)) {
            this.first /= p[0];
            this.second /= p[1];
            return;
        }
        this.first /= p.first;
        this.second /= p.second;
    };
    NumTuple.prototype.mod = function (p) {
        if (typeof p === 'number') {
            this.first %= p;
            this.second %= p;
            return;
        }
        if (Array.isArray(p)) {
            this.first %= p[0];
            this.second %= p[1];
            return;
        }
        this.first %= p.first;
        this.second %= p.second;
    };
    NumTuple.prototype.pow = function (power) {
        this.first = Math.pow(this.first, power);
        this.second = Math.pow(this.second, power);
    };
    NumTuple.prototype.fixed = function (decimals) {
        this.first = Number(this.first.toFixed(decimals));
        this.second = Number(this.second.toFixed(decimals));
        return this;
    };
    Object.defineProperty(NumTuple.prototype, "raw", {
        get: function () {
            return [this.first, this.second];
        },
        enumerable: false,
        configurable: true
    });
    return NumTuple;
}());
var Vector = /** @class */ (function (_super) {
    __extends(Vector, _super);
    function Vector(x, y) {
        var _this = this;
        if (Array.isArray(x)) {
            _this = _super.call(this, x[0], x[1]) || this;
        }
        else {
            _this = _super.call(this, x, y) || this;
        }
        return _this;
    }
    Object.defineProperty(Vector.prototype, "x", {
        get: function () { return this.first; },
        set: function (x) { this.first = x; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () { return this.second; },
        set: function (y) { this.second = y; },
        enumerable: false,
        configurable: true
    });
    Vector.add = function (p1, p2) {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.add(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.add(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.add(p1.raw, [p2, p2]));
    };
    Vector.sub = function (p1, p2) {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.sub(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.sub(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.sub(p1.raw, [p2, p2]));
    };
    Vector.mult = function (p1, p2) {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.mult(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.mult(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.mult(p1.raw, [p2, p2]));
    };
    Vector.div = function (p1, p2) {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.div(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.div(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.div(p1.raw, [p2, p2]));
    };
    Vector.mod = function (p1, p2) {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.mod(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.mod(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.mod(p1.raw, [p2, p2]));
    };
    Vector.pow = function (p1, p2) {
        if (p2 instanceof Vector) {
            return new Vector(NumTupleHelper.pow(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Vector(NumTupleHelper.pow(p1.raw, p2));
        }
        return new Vector(NumTupleHelper.pow(p1.raw, [p2, p2]));
    };
    Vector.is = function (v) { return v.x; };
    Object.defineProperty(Vector.prototype, "magnitude", {
        // STACTIC END
        get: function () { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); },
        set: function (magnitude) {
            var scale = magnitude / this.magnitude;
            this.mult(scale);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "normalize", {
        get: function () { return Vector.div(this, this.magnitude); },
        enumerable: false,
        configurable: true
    });
    Vector.zero = new Vector(0, 0);
    Vector.one = new Vector(1, 1);
    return Vector;
}(NumTuple));
var Size = /** @class */ (function (_super) {
    __extends(Size, _super);
    function Size(w, h) {
        var _this = this;
        if (Array.isArray(w)) {
            _this = _super.call(this, w[0], w[1]) || this;
        }
        else {
            _this = _super.call(this, w, h) || this;
        }
        return _this;
    }
    Object.defineProperty(Size.prototype, "w", {
        get: function () { return this.first; },
        set: function (w) { this.first = w; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Size.prototype, "h", {
        get: function () { return this.second; },
        set: function (h) { this.second = h; },
        enumerable: false,
        configurable: true
    });
    Size.add = function (p1, p2) {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.add(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.add(p1.raw, p2));
        }
        return new Size(NumTupleHelper.add(p1.raw, [p2, p2]));
    };
    Size.sub = function (p1, p2) {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.sub(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.sub(p1.raw, p2));
        }
        return new Size(NumTupleHelper.sub(p1.raw, [p2, p2]));
    };
    Size.mult = function (p1, p2) {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.mult(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.mult(p1.raw, p2));
        }
        return new Size(NumTupleHelper.mult(p1.raw, [p2, p2]));
    };
    Size.div = function (p1, p2) {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.div(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.div(p1.raw, p2));
        }
        return new Size(NumTupleHelper.div(p1.raw, [p2, p2]));
    };
    Size.mod = function (p1, p2) {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.mod(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.mod(p1.raw, p2));
        }
        return new Size(NumTupleHelper.mod(p1.raw, [p2, p2]));
    };
    Size.pow = function (p1, p2) {
        if (p2 instanceof Size) {
            return new Size(NumTupleHelper.pow(p1.raw, p2.raw));
        }
        if (Array.isArray(p2)) {
            return new Size(NumTupleHelper.pow(p1.raw, p2));
        }
        return new Size(NumTupleHelper.pow(p1.raw, [p2, p2]));
    };
    Size.zero = new Size(0, 0);
    Size.one = new Size(1, 1);
    return Size;
}(NumTuple));
export { Vector, Size };
