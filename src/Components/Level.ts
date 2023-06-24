import { CameraManager } from "../Managers/CameraManager.js";
import { SceneManager } from "../Managers/SceneManager.js";
import { IsoMap, Size, Vector } from "../Types/types.js";
import { Scene } from "./Scene.js";
import { Tile } from "./Tile.js";


export class Level extends Scene {
    private _mapBlueprint: IsoMap
    private _tileCode: any
    private _mapSet: Array<Tile>
    private _size: Size
    constructor(blueprint: IsoMap, tileCode: object) {
        super()
        this._mapBlueprint = blueprint;
        this._size = this._mapBlueprint.size;
        this._tileCode = tileCode;
        this._mapSet = [];

        this.initMap()
    }
    initMap(): void {
        this._mapBlueprint.grid.forEach((tileSet: string, i: number) => {
            const rowI = Math.floor(i / this._mapBlueprint.size.w)
            const colI = i % this._mapBlueprint.size.w
            const tileSize = SceneManager.getInstance().tileSize

            const pos = new Vector(
                ((tileSize.w * 0.5) * colI) - ((tileSize.w * 0.5) * rowI),
                ((tileSize.h * 0.5) * rowI) + ((tileSize.h * 0.5) * colI)
            );

            const assetName = this._tileCode[Number(tileSet[0])]

            this._mapSet.push(new Tile(pos, tileSize, assetName, new Vector(rowI, colI), Number(tileSet[1])))

        });


    }
    public updateMap(): void {
        const camera = CameraManager.getInstance().current;
        this._mapSet.forEach((tile: Tile, i: number) => {
            const rowI = Math.floor(i / this._mapBlueprint.size.w)
            const colI = i % this._mapBlueprint.size.w
            const tileSize = Size.mult(SceneManager.getInstance().tileSize, camera.zoom);

            const pos = new Vector(
                ((tileSize.w * 0.5) * colI) - ((tileSize.w * 0.5) * rowI),
                ((tileSize.h * 0.5) * rowI) + ((tileSize.h * 0.5) * colI)
            );
            tile.setPosition(Vector.add(pos, camera.position));
            tile.size = tileSize

        });

    }
    render(): void {
        this.updateMap();
    }
    get mapSet() { return this._mapSet}
}