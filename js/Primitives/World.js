import { Containable } from "../Modules/Containable.js";
import { Transform } from "../Modules/Transform.js";
import { Vector, Size } from "../Types/types.js";
var World = /** @class */ (function () {
    function World() {
        World._instance = this;
        this.transform = new Transform(Vector.zero, Size.zero, 0);
        this.container = new Containable(this, null);
    }
    World.getInstance = function () {
        if (!World._instance) {
            World._instance = new World();
        }
        return World._instance;
    };
    return World;
}());
export { World };
