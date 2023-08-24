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
import { Entity } from "../Primitives/Entity.js";
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    function Sprite(asset, pos, size, parent) {
        var _this = _super.call(this, pos, size, 0, parent) || this;
        _this.asset = asset;
        return _this;
    }
    Sprite.prototype.render = function (ctx) {
        ctx.drawImage(this.asset, this.transform.position.x, this.transform.position.y, this.transform.size.w, this.transform.size.h);
    };
    return Sprite;
}(Entity));
export { Sprite };
