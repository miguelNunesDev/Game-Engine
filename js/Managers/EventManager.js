var EventManager = /** @class */ (function () {
    function EventManager() {
        var _this = this;
        this.update = function () {
            var _a;
            (_a = _this._actions) === null || _a === void 0 ? void 0 : _a.update.forEach(function (event) { return event.cb(); });
            _this.cursorEvents();
            _this.keyEvents();
        };
        this._events = new Map();
        this._keyActions = new Map();
        this._activeKeys = new Set();
        this._actions = {
            render: [],
            update: [],
            hover: [],
            click: [],
        };
        document.addEventListener('keypress', function (e) { return _this._activeKeys.add(e.key); });
        document.addEventListener('keyup', function (e) { return _this._activeKeys.delete(e.key); });
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
    EventManager.prototype.listen = function (id, state, cb) {
        var eventId = this._actions[state].length;
        this._actions[state].push({ id: id, cb: cb });
        return eventId;
    };
    EventManager.prototype.listenKeyEvent = function (key, cb) {
        var keyActions = this._keyActions.get(key);
        if (!keyActions) {
            this._keyActions.set(key, [cb]);
            return 0;
        }
        var id = this._keyActions.get(key).length;
        this._keyActions.get(key).push(cb);
        return id;
    };
    EventManager.prototype.render = function () {
        var _a;
        (_a = this._actions) === null || _a === void 0 ? void 0 : _a.update.forEach(function (event) { return event.cb(); });
    };
    EventManager.prototype.keyEvents = function () {
        var _this = this;
        this._activeKeys.forEach(function (key) {
            var _a;
            (_a = _this._keyActions.get(key)) === null || _a === void 0 ? void 0 : _a.forEach(function (cb) { return cb(); });
        });
    };
    EventManager.prototype.cursorEvents = function () {
        var _this = this;
        this._actions.hover.forEach(function (e) {
            if (_this._events.get(e.id).isHover())
                e.cb();
        });
        this._actions.click.forEach(function (e) {
            if (_this._events.get(e.id).isClicked())
                e.cb();
        });
    };
    return EventManager;
}());
export { EventManager };
