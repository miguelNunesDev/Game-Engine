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
        this._uid = EventManager.getInstance().subscribe(this);
        this._keyMap = {};
    }
    EventListener.prototype.on = function (state, cb) {
        var event = EventManager.getInstance();
        return event.listen(this._uid, state, cb);
    };
    EventListener.prototype.onKeyEvent = function (eventName, cb) {
        var _this = this;
        if (!this._keyLayout[eventName]) {
            return console.error('No Event in keyLayout');
        }
        var manager = EventManager.getInstance();
        this._keyLayout[eventName].forEach(function (key) {
            var id = manager.listenKeyEvent(key, cb);
            if (!_this._keyMap[eventName])
                _this._keyMap[eventName] = {};
            _this._keyMap[eventName][key] = id;
        });
    };
    Object.defineProperty(EventListener.prototype, "keyLayout", {
        get: function () { return this._keyLayout; },
        set: function (layout) {
            this._keyLayout = layout;
        },
        enumerable: false,
        configurable: true
    });
    return EventListener;
}());
export { EventListener };
