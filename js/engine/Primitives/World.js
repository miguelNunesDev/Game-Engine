import { Containable } from "../Modules/Containable.js";
import { Transform } from "../Modules/Transform.js";
var World = /** @class */ (function () {
    function World() {
        World._instance = this;
        this.transform = new Transform({});
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
