import { CollisionManager } from "../Managers/CollisionManager.js";
import { EventManager } from "../Managers/EventManager.js";
import { Cursor } from "../Primitives/Cursor.js";
import { CursorState } from "../Types/types.js";
var EventListener = /** @class */ (function () {
    function EventListener(_entity) {
        var _this = this;
        this._entity = _entity;
        this.isClicked = function () {
            if (!_this._entity.transform)
                return false;
            var cursor = Cursor.getInstance();
            return _this.isHover && cursor.state === CursorState.PRIMARY_DOWN;
        };
        this.isHover = function () {
            if (!_this._entity.transform)
                return false;
            var cursor = Cursor.getInstance();
            var collider = CollisionManager.getInstance();
            return collider.check(cursor.transform, _this._entity.transform);
        };
        this._actions = {
            render: [],
            update: [],
            hover: [],
            click: []
        };
        this._uid = EventManager.getInstance().subscribe(this);
    }
    Object.defineProperty(EventListener.prototype, "actions", {
        get: function () { return this._actions; },
        enumerable: false,
        configurable: true
    });
    EventListener.prototype.on = function (state, cb) {
        var id = this._actions[state].length;
        this._actions[state].push(cb);
        return id;
    };
    return EventListener;
}());
export { EventListener };
