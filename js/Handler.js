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
import { Circle } from "./Primitives/Circle.js";
import { Square } from "./Primitives/Square.js";
import { Entity } from "./Primitives/Entity.js";
import { Vector } from "./Types/types.js";
import { CollisionManager } from "./Managers/CollisionManager.js";
import { Cursor } from "./Primitives/Cursor.js";
var Handler = /** @class */ (function (_super) {
    __extends(Handler, _super);
    function Handler(pos, size, parent, shape, stroke) {
        if (shape === void 0) { shape = 'circle'; }
        var _this = this;
        var position = new Vector(pos.x - size.w * 0.5, pos.y - size.h * 0.5);
        _this = _super.call(this, position, size, 0, parent) || this;
        _this.stroke = stroke || 'red';
        _this.shape = _this.getShape(shape);
        _this.collider = CollisionManager.getInstance();
        _this.cursor = Cursor.getInstance();
        _this._on = {
            clicked: [],
            hover: [],
            resting: []
        };
        _this.initStateChecker();
        return _this;
    }
    Handler.prototype.initStateChecker = function () {
        // this.cursor.onEntityClick(this, () => {
        //     Game.WINDOW.requestAnimationFrame(() => {
        //         this.transform.center = this.cursor.transform.position;
        //         if (!this._on['clicked'].length) return;
        //         this._on['clicked'].forEach((cb: Function) => { cb() })
        //     })
        // })
        // this.cursor.onEntityHover(this, () => {
        //     console.log('hover');
        //     console.log(this.transform.position);
        //     console.log(this.cursor.transform.position);
        // })
    };
    Handler.prototype.getShape = function (shape) {
        var _this = this;
        var formType = {
            circle: function () { return new Circle(_this.transform.center, _this.transform.size.w * 0.5, _this); },
            square: function () { return new Square(_this.transform.position, _this.transform.size, _this, _this.stroke, 'white'); }
        };
        var shapeFunc = formType[shape];
        return shapeFunc();
    };
    Handler.prototype.on = function (state, cb) {
        this._on[state].push(cb);
    };
    Handler.prototype.render = function (ctx) {
        this.shape.render(ctx);
    };
    return Handler;
}(Entity));
export { Handler };
