import { EntitiesManager } from "../Managers/EntitiesManager.js";
import { Containable } from "../Modules/Containable.js";
import { EventListener } from "../Modules/EventListener.js";
import { Transform } from "../Modules/Transform.js";
var Entity = /** @class */ (function () {
    function Entity(tranform, parent) {
        this._uid = EntitiesManager.getInstance().register(this);
        this.transform = new Transform(tranform);
        this.container = new Containable(this, parent);
        this.event = new EventListener(this);
        this._visible = true;
        this._depth = 1;
        this.visible = true;
    }
    Object.defineProperty(Entity.prototype, "depth", {
        get: function () { return this.transform.position.y * this._depth; },
        set: function (depth) { this._depth = depth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "visible", {
        get: function () { return this._visible; },
        set: function (bol) {
            this._visible = bol;
            this.container.setChildsVisibility(bol);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "uid", {
        get: function () { return this._uid; },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.render = function (ctx) { };
    return Entity;
}());
export { Entity };
