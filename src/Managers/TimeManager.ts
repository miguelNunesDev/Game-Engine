// SINGLETON
type Millisecs = number;
type framePerSeconds = number;
export class TimeManager {
    private static _instance: TimeManager;
    private _delta: Millisecs;
    private _lastTime: Millisecs;
    private _now: Millisecs;
    private _fps: number;
    private _interval: framePerSeconds;
    private _intervals: Array<Millisecs>
    private _actions: Array<Function>

    private constructor(fps: number, interval: Millisecs) {
        this._fps = fps;
        this._interval = interval / this._fps;
        this._delta = 0;
        this._lastTime = 0;
        this._now = 0;
        this._intervals = [];
        this._actions = [];
    }
    public static getInstance(fps: number = 60, interval: Millisecs = 1000): TimeManager {
        
        return TimeManager._instance ? TimeManager._instance : TimeManager._instance  = new TimeManager(fps, interval)
    }
    startInterval() {
        const intervalIndex = this._intervals.length;
        this._intervals.push(new Date().getTime())
        return intervalIndex;
    }
    endInterval(index: number): Millisecs {
        const now = new Date().getTime();
        const elapsed = now - this._intervals[index];
        if (elapsed > this._interval) {
            this._lastTime = this._now;
        }
        const delta = elapsed / this._fps;
        return delta
    }
    update() {
        this.updateDelta();
        if(!this._actions.length) return;
        this._actions.forEach((f: Function) => {
            f(this._delta);
        })
    }
    onUpdate(f: Function) {
        const index = this._actions.length;
        this._actions.push(f);
        console.log(this._actions.length);
        return index;
    }
    updateDelta() {
        this._now = new Date().getTime();

        if (!this._lastTime) {
            this._lastTime = this._now;
        }
        let elapsed = this._now - this._lastTime;

        if (elapsed > this._interval) {
            this._lastTime = this._now;
        }
        this._delta = elapsed / this._fps;
    }
    get delta(): Millisecs {
        return this._delta;
    }
}