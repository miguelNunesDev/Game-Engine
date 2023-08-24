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
import { AssetManager } from "../Managers/AssetsManager.js";
import { Entity } from "../Primitives/Entity.js";
import { Sprite } from "./Sprite.js";
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile(pos, size, assetName, location, depth) {
        var _this = _super.call(this, pos, size, 0) || this;
        _this._depth = depth;
        _this._assetName = assetName;
        _this._location = location;
        var assetManager = AssetManager.getInstance();
        var img = assetManager.get(_this._assetName);
        _this._sprite = new Sprite(img, pos, size, _this);
        return _this;
    }
    return Tile;
}(Entity));
export { Tile };
