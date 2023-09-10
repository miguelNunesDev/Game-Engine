import { Transform } from "../Modules/Transform";
var UIText = /** @class */ (function () {
    function UIText(content, transform, style) {
        this.content = content;
        this.style = style;
        this.transform = new Transform(transform.position, transform.size, transform.rotation);
    }
    UIText.prototype.render = function (ctx) {
        ctx.font = "".concat(this.transform.size.w, "px ").concat(this.style.family);
        ctx.strokeText(this.content, this.transform.position.x, this.transform.position.y);
    };
    return UIText;
}());
