var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.lerp = function (from, to, interval) {
        return {
            x: (1 - interval) * from.x + interval * to.x,
            y: (1 - interval) * from.y + interval * to.y,
        };
    };
    return Helper;
}());
var degToRad = function (deg) { return (deg * Math.PI) / 180; };
var lerp = function (from, to, interval) {
    return {
        x: (1 - interval) * from.x + interval * to.x,
        y: (1 - interval) * from.y + interval * to.y,
    };
};
var lerpLine = function (line, interval) {
    return {
        x: (1 - interval) * line.pi.x + interval * line.pf.x,
        y: (1 - interval) * line.pi.y + interval * line.pf.y,
    };
};
var abs = function (x) { return x < 0 ? -x : x; };
export { lerp, lerpLine, Helper, abs, degToRad };
