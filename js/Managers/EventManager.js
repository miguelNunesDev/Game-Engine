var EventManager = /** @class */ (function () {
    function EventManager() {
        this._events = new Map();
    }
    EventManager.getInstance = function () {
        EventManager._instance = EventManager._instance
            ? EventManager._instance
            : new EventManager();
        return EventManager._instance;
    };
    EventManager.prototype.subscribe = function (event) {
        var uid = this._events.size;
        this._events.set(uid, event);
        return uid;
    };
    EventManager.prototype.render = function () {
        this._events.forEach(function (e) {
            e.actions.render.forEach(function (cb) { return cb(); });
        });
    };
    EventManager.prototype.update = function () {
        this._events.forEach(function (event) {
            event.actions.update.forEach(function (cb) { return cb(); });
            if (!event.isHover())
                return;
            event.actions.hover.forEach(function (cb) { return cb(); });
            if (!event.isClicked())
                return;
            event.actions.hover.forEach(function (cb) { return cb(); });
        });
    };
    return EventManager;
}());
export { EventManager };
