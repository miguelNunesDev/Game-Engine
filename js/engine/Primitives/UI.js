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
import { UIManager } from "../Managers/UiManager.js";
import { Transform } from "../Modules/Transform.js";
var UI = /** @class */ (function () {
    function UI(transform) {
        this.transform = new Transform(transform);
        this.visible = true;
        this._UID = UIManager.getInstance().register(this);
    }
    UI.prototype.render = function (ctx) { };
    return UI;
}());
var UIText = /** @class */ (function (_super) {
    __extends(UIText, _super);
    function UIText(content, transform, style) {
        var _this = _super.call(this, transform) || this;
        _this.content = content;
        _this.style = style;
        return _this;
    }
    UIText.prototype.toUppercase = function () {
        this.content = this.content.toUpperCase();
    };
    UIText.prototype.render = function (ctx) {
        ctx.fillStyle = 'gray';
        ctx.font = "".concat(this.transform.size.w, "px ").concat(this.style.family);
        ctx.fillText(this.content, this.transform.position.x, this.transform.position.y);
    };
    return UIText;
}(UI));
export { UI, UIText };
