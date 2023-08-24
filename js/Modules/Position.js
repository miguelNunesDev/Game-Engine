import { Size, Vector } from "../Types/types";
var APosition = /** @class */ (function () {
    function APosition(world, local, precision) {
        if (precision === void 0) { precision = 3; }
        var _a, _b;
        this.world = world;
        this.local = local;
        this.precision = precision;
        this.world = (_a = world.fixed(precision)) !== null && _a !== void 0 ? _a : Vector.zero;
        this.world = (_b = local.fixed(precision)) !== null && _b !== void 0 ? _b : world;
    }
    APosition.prototype.set = function (pos, space) {
        if (space === void 0) { space = 'WORLD'; }
        switch (space) {
            case 'LOCAL':
                this.local = pos;
                this.world = Vector.sub(pos, this.local).fixed(this.precision);
                break;
            case 'WORLD':
                this.world = pos;
                this.local = Vector.sub(pos, this.world).fixed(this.precision);
                break;
        }
    };
    return APosition;
}());
var ASize = /** @class */ (function () {
    function ASize(world, local, precision) {
        if (precision === void 0) { precision = 3; }
        var _a, _b;
        this.world = world;
        this.local = local;
        this.precision = precision;
        this.world = (_a = world.fixed(precision)) !== null && _a !== void 0 ? _a : new Size(1);
        this.world = (_b = local.fixed(precision)) !== null && _b !== void 0 ? _b : world;
    }
    return ASize;
}());
