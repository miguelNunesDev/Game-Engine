import { Vector } from "./Types/types";

class Helper {
    static lerp(from: Vector, to: Vector, interval: number) {
        return {
            x: (1 - interval) * from.x + interval * to.x,
            y: (1 - interval) * from.y + interval * to.y,
        };
    }

}
const degToRad = (deg: number) => (deg * Math.PI) / 180;
const lerp = (from: Vector, to: Vector, interval: number) => {
    return {
        x: (1 - interval) * from.x + interval * to.x,
        y: (1 - interval) * from.y + interval * to.y,
    };
}
const lerpLine = (line: { pi: Vector, pf: Vector }, interval: number) => {
    return {
        x: (1 - interval) * line.pi.x + interval * line.pf.x,
        y: (1 - interval) * line.pi.y + interval * line.pf.y,
    };

}

const abs = (x: number) => x < 0 ? -x : x;

export { lerp, lerpLine, Helper, abs, degToRad };