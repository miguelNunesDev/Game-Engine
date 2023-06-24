import { AssetManager } from "../Managers/AssetsManager.js";
import { Entity } from "../Primitives/Entity.js";
import { Size, Vector } from "../Types/types.js";
import { Sprite } from "./Sprite.js";


export class Tile extends Entity {
    private _assetName: string
    private _location: Vector
    private _sprite: Sprite
    constructor(pos: Vector, size: Size, assetName: string, location: Vector, depth: number) {
        super(pos, size)
        this._depth = depth
        this._assetName = assetName
        this._location = location
        const assetManager = AssetManager.getInstance(); 
        const img = assetManager.get(this._assetName) as HTMLImageElement;
        this._sprite = new Sprite(img, pos, size, this)
    }
}