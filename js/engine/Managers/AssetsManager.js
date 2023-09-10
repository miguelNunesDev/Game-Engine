import { Asset } from "../Components/Asset.js";
var AssetManager = /** @class */ (function () {
    function AssetManager() {
        this.assets = new Map();
        this.unloaded = [];
    }
    AssetManager.getInstance = function () {
        if (!AssetManager._instance) {
            AssetManager._instance = new AssetManager();
        }
        return AssetManager._instance;
    };
    AssetManager.prototype.get = function (assetName) {
        return this.assets.get(assetName);
    };
    AssetManager.prototype.add = function (name, path) {
        this.unloaded.push(new Asset(name, path));
    };
    AssetManager.prototype.load = function () {
        var _this = this;
        this.unloaded.forEach(function (asset) {
            var img = new Image();
            img.src = asset.path;
            _this.assets.set(asset.name, img);
        });
        this.unloaded = [];
    };
    return AssetManager;
}());
export { AssetManager };
