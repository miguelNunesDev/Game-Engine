import { CursorState, Vector } from "./Types/types";

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

const createObjectFromEnum = (enumerator:any) => {
    const obj: any = {}

    Object.keys(enumerator).forEach((key) => {
        const number = Number(key);
        if (Number.isNaN(number)) return;
        obj[Number(key)] = [];
    })
    return obj
}
const isTouchDevice = () => {
    return 'ontouchstart' in window;
}

export { lerp, lerpLine, abs, degToRad, createObjectFromEnum, isTouchDevice };