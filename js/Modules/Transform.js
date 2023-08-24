import { Size, Vector } from "../Types/types.js";
var _Position = /** @class */ (function () {
    function _Position(world, local, _precision) {
        if (_precision === void 0) { _precision = 3; }
        var _a, _b;
        this._precision = _precision;
        this._world = (_a = world === null || world === void 0 ? void 0 : world.fixed(_precision)) !== null && _a !== void 0 ? _a : Vector.zero;
        this._local = (_b = local === null || local === void 0 ? void 0 : local.fixed(_precision)) !== null && _b !== void 0 ? _b : Vector.zero;
    }
    Object.defineProperty(_Position.prototype, "world", {
        get: function () { return this._world; },
        set: function (pos) {
            this._world = pos.fixed(this._precision);
            this._local = Vector.sub(pos, this._world).fixed(this._precision);
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(_Position.prototype, "local", {
        get: function () { return this._local; },
        set: function (pos) {
            this._local = pos.fixed(this._precision);
            this._world = Vector.sub(pos, this._local).fixed(this._precision);
        },
        enumerable: false,
        configurable: true
    });
    ;
    _Position.prototype.move = function (pos) {
        this._local = Vector.add(pos, this._local);
        this._world = Vector.add(pos, this._world);
    };
    _Position.prototype.resetLocal = function (pos) {
        if (pos === void 0) { pos = Vector.zero; }
        this._local = pos.fixed(this._precision);
    };
    return _Position;
}());
var _Size = /** @class */ (function () {
    function _Size(world, _precision) {
        if (_precision === void 0) { _precision = 3; }
        var _a;
        this._precision = _precision;
        this._world = (_a = world === null || world === void 0 ? void 0 : world.fixed(_precision)) !== null && _a !== void 0 ? _a : Size.zero;
        this._local = new Size(1);
    }
    Object.defineProperty(_Size.prototype, "world", {
        get: function () { return this._world; },
        set: function (pos) {
            this._world = pos.fixed(this._precision);
            this._local = Size.sub(pos, this._world).fixed(this._precision);
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(_Size.prototype, "local", {
        get: function () { return this._local; },
        set: function (pos) {
            this._local = pos.fixed(this._precision);
            this._world = Size.sub(pos, this._local).fixed(this._precision);
        },
        enumerable: false,
        configurable: true
    });
    ;
    _Size.prototype.scale = function (pos) {
        this._local = Size.mult(pos, this._local);
        this._world = Size.mult(pos, this._world);
    };
    return _Size;
}());
var _Rotation = /** @class */ (function () {
    function _Rotation(angle, _type, precision) {
        if (angle === void 0) { angle = 0; }
        if (_type === void 0) { _type = 'degre'; }
        if (precision === void 0) { precision = 3; }
        this._type = _type;
        this.precision = precision;
        this._world = this._type === 'degre' ? _Rotation.toQuartenion(angle) : angle;
        this._local = 0;
    }
    _Rotation.toDegres = function (deg) { if (deg === 0)
        return deg; return (deg / Math.PI) * 180; };
    _Rotation.toQuartenion = function (quartenion) { if (quartenion === 0)
        return quartenion; return (quartenion * Math.PI) / 180; };
    Object.defineProperty(_Rotation.prototype, "world", {
        get: function () { return this._world; },
        set: function (quartenion) {
            var delta = quartenion - this._world;
            this._world = quartenion;
            this._local = Number(delta.toFixed(this.precision));
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(_Rotation.prototype, "local", {
        get: function () { return this._local; },
        set: function (quartenion) {
            var delta = quartenion - this._local;
            this._local = quartenion;
            this._world = Number(delta.toFixed(this.precision));
        },
        enumerable: false,
        configurable: true
    });
    ;
    _Rotation.prototype.rotate = function (_angle, type) {
        if (type === void 0) { type = 'degre'; }
        var angle = type === 'degre' ? _Rotation.toQuartenion(_angle) : _angle;
        this._local += angle;
        this._world += this.world;
    };
    return _Rotation;
}());
var Transform = /** @class */ (function () {
    function Transform(pos, size, degre, _precision) {
        if (_precision === void 0) { _precision = 3; }
        this._precision = _precision;
        this._position = new _Position(pos, null, this._precision);
        this._center;
        this._size = new _Size(size, this._precision);
        this._rotation = new _Rotation(degre);
        this.move = this._position.move;
        this.scale = this._size.scale;
        this.rotate = this._rotation.rotate;
        this._actions = {
            'change': [],
            'scale': [],
            'position': [],
            'rotate': []
        };
    }
    Transform.prototype.on = function (cb, state) {
        this._actions[state].push(cb);
    };
    Transform.prototype.initActions = function (states, value) {
        var _this = this;
        states.forEach(function (state) {
            var _a;
            (_a = _this._actions[state]) === null || _a === void 0 ? void 0 : _a.forEach(function (action) { return action(value); });
        });
    };
    Object.defineProperty(Transform.prototype, "local", {
        get: function () {
            return {
                position: this._position.local,
                rotation: this._rotation.local,
                size: this._size.local
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "position", {
        get: function () { return this._position.world; },
        set: function (pos) {
            this.initActions(['change', 'position'], pos);
            this._position.world = pos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "localPosition", {
        set: function (pos) {
            this._position.local = pos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "center", {
        get: function () {
            if (this._center)
                return this._center;
            var half = Size.mult(this._size.world, 0.5);
            this._center = new Vector(this._position.world.x - half.w, this._position.world.y - half.h).fixed(this._precision);
            console.log(this._center, half, this.position);
            return this._center;
        },
        set: function (pos) {
            var half = Size.mult(this._size.world, 0.5);
            this._position.world = new Vector(pos.x - half.w, pos.y - half.h);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "size", {
        get: function () { return this._size.world; },
        set: function (size) {
            this.initActions(['change', 'scale'], size);
            this._size.world = size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "localSize", {
        set: function (size) {
            this.initActions(['change', 'scale'], size);
            this._size.local = size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rotation", {
        get: function () { return this._rotation.world; },
        set: function (deg) {
            this.initActions(['change', 'scale'], deg);
            this._rotation.world = _Rotation.toQuartenion(deg);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "localRotation", {
        set: function (deg) {
            this.initActions(['change', 'scale'], deg);
            this._rotation.local = _Rotation.toQuartenion(deg);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "data", {
        get: function () {
            return {
                position: this._position.world,
                size: this._size.world,
                rotation: this._rotation.world
            };
        },
        enumerable: false,
        configurable: true
    });
    return Transform;
}());
export { Transform };
