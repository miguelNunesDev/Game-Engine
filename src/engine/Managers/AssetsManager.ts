import { Asset } from "../Components/Asset.js";

export class AssetManager {
    assets: Map<string, HTMLImageElement>
    unloaded: Array<Asset>
    private static _instance: AssetManager
    private constructor() {
        this.assets = new Map<string, HTMLImageElement>();
        this.unloaded = [];
    }
    public static getInstance(): AssetManager {
        if (!AssetManager._instance) {
            AssetManager._instance = new AssetManager();
        }
        return AssetManager._instance;
    }
    get(assetName: string) {
        return this.assets.get(assetName);
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
