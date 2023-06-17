// SINGLETON
type millisecs = number;
type framePerSeconds = number;
export class TimeManager {
    private static _instance: TimeManager;
    private _delta: millisecs;
    private _lastTime: millisecs;
    private _now: millisecs;
    private _fps: number;
    private _interval: framePerSeconds;

    private constructor(fps: number, interval: millisecs) {
        this._fps = fps;
        this._interval = interval / this._fps;
        this._delta = 0;
        this._lastTime = 0;
        this._now = 0;
    }
    public static getInstance(fps: number = 60, interval: millisecs = 1000): TimeManager {
        return TimeManager._instance ? TimeManager._instance : new TimeManager(fps, interval)
    }

    get delta(): millisecs {
        this._now = new Date().getTime();

        if (!this._lastTime) {
            this._lastTime = this._now;
        }
        let elapsed = this._now - this._lastTime;

        if (elapsed > this._interval) {
            this._lastTime = this._now;
        }
        this._delta = elapsed / this._fps;
        return this._delta;
    }
}