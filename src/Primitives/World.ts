import { Vector, Size } from "../Types/types.js";
import { Entity } from "./Entity.js";

export class World {
    private static _instance: any
    size: Size
    position: { world: Vector, local: Vector }
    center: Vector
    childs: Array<any>
    private constructor() {
        World._instance = this;
        this.size = Size.zero()
        this.position = { world: Vector.zero(), local: Vector.zero() };
        this.center = Vector.zero();
        this.childs = [];
    }
    public static getInstance(): World {
        if (!World._instance) {
            World._instance = new World();
        }
        return World._instance;
    }
    addChild(child: Entity): void { }

}