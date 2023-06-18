import { Asset } from "../Components/Asset.js";

export class AssetManager {
    assets: Map<string, HTMLImageElement>
    unloaded: Array<Asset>
    constructor() {
        this.assets = new Map<string, HTMLImageElement>();
        this.unloaded = [];
    }
    get(assetName: string) {
        return assetName ? this.assets.get(assetName) : this.assets;
    }
    add(name: string, path: string) {
        this.unloaded.push(new Asset(name, path));
    }
    load() {
        this.unloaded.forEach((asset: Asset) => {
            const img = new Image();
            img.src = asset.path;
            this.assets.set(asset.name, img)
        });
        this.unloaded = []
    }
}
