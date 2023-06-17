var TimeManager = /** @class */ (function () {
    function TimeManager(fps, interval) {
        this._fps = fps;
        this._interval = interval / this._fps;
        this._delta = 0;
        this._lastTime = 0;
        this._now = 0;
    }
    TimeManager.getInstance = function (fps, interval) {
        if (fps === void 0) { fps = 60; }
        if (interval === void 0) { interval = 1000; }
        return TimeManager._instance ? TimeManager._instance : new TimeManager(fps, interval);
    };
    Object.defineProperty(TimeManager.prototype, "delta", {
        get: function () {
            this._now = new Date().getTime();
            if (!this._lastTime) {
                this._lastTime = this._now;
            }
            var elapsed = this._now - this._lastTime;
            if (elapsed > this._interval) {
                this._lastTime = this._now;
            }
            this._delta = elapsed / this._fps;
            return this._delta;
        },
        enumerable: false,
        configurable: true
    });
    return TimeManager;
}());
export { TimeManager };
//# sourceMappingURL=TimeManager.js.map