import { Game } from "../Game.js";
import { Size, Vector, Space } from "../Types/types.js";
import { World } from "./World.js";
var Entity = /** @class */ (function () {
    function Entity(pos, size, parent) {
        if (pos === void 0) { pos = Vector.zero(); }
        if (size === void 0) { size = Size.zero(); }
        if (parent === void 0) { parent = false; }
        this._uid = Game.getInstance().entities.register(this);
        this._parent = parent ? parent : World.getInstance();
        this._childs = [];
        this._visible = true;
        this._parent.addChild(this);
        this._position = {
            world: { x: Number(pos.x.toFixed(3)), y: Number(pos.y.toFixed(3)) },
            local: Vector.sub(pos, this._parent.position.world)
        };
        this._size = size;
        this._center = new Vector(this._position.world.x + this._size.w * 0.5, this._position.world.y + this._size.h * 0.5);
        this.setPosition(pos);
        this.visible = true;
    }
    Object.defineProperty(Entity.prototype, "visible", {
        get: function () { return this._visible; },
        set: function (bol) {
            this._visible = bol;
            if (!this.childs.length)
                return;
            this.childs.forEach(function (child) { child.visible = bol; });
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.scale = function (scalar) {
        this.size = Size.mult(this.size, scalar);
    };
    Entity.prototype.setChildsSize = function (size) {
        if (!this._childs.length)
            return;
        this._childs.forEach(function (child) {
            if (!child.size)
                return;
            child.size = Size.add(child.size, size);
        });
    };
    Entity.prototype.updateChildsPosition = function (deltaPosition) {
        if (!this._childs.length)
            return;
        this._childs.forEach(function (child) {
            child.setPosition(Vector.add(child.position.world, deltaPosition), Space.WORLD);
        });
    };
    Object.defineProperty(Entity.prototype, "uid", {
        get: function () { return this._uid; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "childs", {
        get: function () { return this._childs; },
        set: function (childs) {
            var _this = this;
            this._childs = childs;
            this._childs.map(function (child) { child.parent = _this; });
        },
        enumerable: false,
        configurable: true
    });
    ;
    Entity.prototype.addChild = function (child) {
        this._childs.push(child);
        return this._childs[this._childs.length - 1];
    };
    Entity.prototype.setChildsVisibility = function (bol) { this.childs.forEach(function (child) { return child.visible = bol; }); };
    Object.defineProperty(Entity.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.setPosition = function (pos, space) {
        if (space === void 0) { space = Space.WORLD; }
        var deltaPosition = Vector.sub(pos, this.position.world);
        switch (space) {
            case Space.LOCAL:
                // TODO:
                break;
            case Space.WORLD:
                this._position = {
                    local: Vector.sub(this.position.world, this._parent.position.world),
                    world: { x: Number(pos.x.toFixed(3)), y: Number(pos.y.toFixed(3)) }
                };
                break;
        }
        this._center = new Vector(this.position.world.x + Number((this._size.w * 0.5).toFixed(3)), this.position.world.y + Number((this._size.h * 0.5).toFixed(3)));
        this.updateChildsPosition(deltaPosition);
    };
    Object.defineProperty(Entity.prototype, "center", {
        get: function () { return this._center; },
        set: function (pos) {
            this.setPosition(new Vector(pos.x - this.size.w * 0.5, pos.y - this.size.h * 0.5));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "size", {
        get: function () { return this._size; },
        set: function (size) {
            var deltaSize = Size.sub(this._size, size);
            this._size = { w: Number(size.w.toFixed(3)), h: Number(size.h.toFixed(3)) };
            this.setChildsSize(deltaSize);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "boundingBox", {
        get: function () {
            return { position: this._position.world, size: this._size };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "parent", {
        get: function () { return this._parent; },
        set: function (e) {
            this._parent = e;
            this._parent.addChild(this);
            this.setPosition(this.position.world, Space.WORLD);
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.render = function (ctx) { };
    return Entity;
}());
export { Entity };
//# sourceMappingURL=Entity.js.map