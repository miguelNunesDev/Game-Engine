var TimeManager = /** @class */ (function () {
    function TimeManager(fps, interval) {
        this._fps = fps;
        this._interval = interval / this._fps;
        this._delta = 0;
        this._lastTime = 0;
        this._now = 0;
        this._intervals = [];
        this._actions = [];
    }
    TimeManager.getInstance = function (fps, interval) {
        if (fps === void 0) { fps = 60; }
        if (interval === void 0) { interval = 1000; }
        return TimeManager._instance ? TimeManager._instance : TimeManager._instance = new TimeManager(fps, interval);
    };
    TimeManager.prototype.startInterval = function () {
        var intervalIndex = this._intervals.length;
        this._intervals.push(new Date().getTime());
        return intervalIndex;
    };
    TimeManager.prototype.endInterval = function (index) {
        var now = new Date().getTime();
        var elapsed = now - this._intervals[index];
        if (elapsed > this._interval) {
            this._lastTime = this._now;
        }
        var delta = elapsed / this._fps;
        return delta;
    };
    TimeManager.prototype.update = function () {
        var _this = this;
        this.updateDelta();
        if (!this._actions.length)
            return;
        this._actions.forEach(function (f) {
            f(_this._delta);
        });
    };
    TimeManager.prototype.onUpdate = function (f) {
        var index = this._actions.length;
        this._actions.push(f);
        console.log(this._actions.length);
        return index;
    };
    TimeManager.prototype.updateDelta = function () {
        this._now = new Date().getTime();
        if (!this._lastTime) {
            this._lastTime = this._now;
        }
        var elapsed = this._now - this._lastTime;
        if (elapsed > this._interval) {
            this._lastTime = this._now;
        }
        var delta = elapsed / this._fps;
        this._delta = Number(delta.toFixed(3));
    };
    Object.defineProperty(TimeManager.prototype, "delta", {
        get: function () {
            return this._delta;
        },
        enumerable: false,
        configurable: true
    });
    return TimeManager;
}());
export { TimeManager };
