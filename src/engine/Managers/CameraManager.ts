import { Camera } from "../Components/Camera";

export class CameraManager {
    private static _instance: CameraManager
    private _current: Camera
    private constructor(camera: Camera) {
        this._current = camera;
    }
    public static getInstance(camera: Camera | boolean = false): CameraManager {
        if (!CameraManager._instance && camera) {
            CameraManager._instance = new CameraManager(camera as Camera);
        }
        return CameraManager._instance;
    }
    get current() { return this._current }
    set current(camera: Camera) { this._current = camera }
}