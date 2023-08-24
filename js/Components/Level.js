var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CameraManager } from "../Managers/CameraManager.js";
import { SceneManager } from "../Managers/SceneManager.js";
import { Size, Vector } from "../Types/types.js";
import { Scene } from "./Scene.js";
import { Tile } from "./Tile.js";
var Level = /** @class */ (function (_super) {
    __extends(Level, _super);
    function Level(blueprint, tileCode) {
        var _this = _super.call(this) || this;
        _this._mapBlueprint = blueprint;
        _this._size = _this._mapBlueprint.size;
        _this._tileCode = tileCode;
        _this._mapSet = [];
        _this.initMap();
        return _this;
    }
    Level.prototype.initMap = function () {
        var _this = this;
        this._mapBlueprint.grid.forEach(function (tileSet, i) {
            var rowI = Math.floor(i / _this._mapBlueprint.size.w);
            var colI = i % _this._mapBlueprint.size.w;
            var tileSize = SceneManager.getInstance().tileSize;
            var pos = new Vector(((tileSize.w * 0.5) * colI) - ((tileSize.w * 0.5) * rowI), ((tileSize.h * 0.5) * rowI) + ((tileSize.h * 0.5) * colI));
            var assetName = _this._tileCode[Number(tileSet[0])];
            _this._mapSet.push(new Tile(pos, tileSize, assetName, new Vector(rowI, colI), Number(tileSet[1])));
        });
    };
    Level.prototype.updateMap = function () {
        var _this = this;
        var camera = CameraManager.getInstance().current;
        this._mapSet.forEach(function (tile, i) {
            var rowI = Math.floor(i / _this._mapBlueprint.size.w);
            var colI = i % _this._mapBlueprint.size.w;
            var tileSize = Size.mult(SceneManager.getInstance().tileSize, camera.zoom);
            var pos = new Vector(((tileSize.w * 0.5) * colI) - ((tileSize.w * 0.5) * rowI), ((tileSize.h * 0.5) * rowI) + ((tileSize.h * 0.5) * colI));
            tile.transform.position = Vector.add(pos, camera.position);
            tile.transform.size = tileSize;
        });
    };
    Level.prototype.render = function () {
        // this.updateMap();
    };
    Object.defineProperty(Level.prototype, "mapSet", {
        get: function () { return this._mapSet; },
        enumerable: false,
        configurable: true
    });
    return Level;
}(Scene));
export { Level };
