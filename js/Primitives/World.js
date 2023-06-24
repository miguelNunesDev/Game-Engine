import { Vector, Size } from "../Types/types.js";
var World = /** @class */ (function () {
    function World() {
        World._instance = this;
        this.size = Size.zero();
        this.position = { world: Vector.zero(), local: Vector.zero() };
        this.center = Vector.zero();
        this.childs = [];
    }
    World.getInstance = function () {
        if (!World._instance) {
            World._instance = new World();
        }
        return World._instance;
    };
    World.prototype.addChild = function (child) { };
    return World;
}());
export { World };
