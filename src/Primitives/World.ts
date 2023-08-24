import { Containable } from "../Modules/Containable.js";
import { Transform } from "../Modules/Transform.js";
import { Vector, Size } from "../Types/types.js";

export class World {
    private static _instance: any
    size: Size
    position: { world: Vector, local: Vector }
    center: Vector
    childs: Array<any>
    public transform: Transform
    public container: Containable
    private constructor() {
        World._instance = this;
        this.transform = new Transform(Vector.zero, Size.zero, 0);
        this.container = new Containable(this, null);
    }
    public static getInstance(): World {
        if (!World._instance) {
            World._instance = new World();
        }
        return World._instance;
    }

}