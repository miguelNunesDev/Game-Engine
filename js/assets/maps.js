import { Size } from "../engine/Types/types.js";
var tileCode = {
    0: 'black-tile',
    1: 'blank-tile',
};
var Maps = [];
var level5x5 = {
    grid: [
        "10", "00", "10", "00", "10",
        "00", "10", "00", "10", "00",
        "10", "00", "10", "00", "10",
        "00", "10", "00", "10", "00",
        "10", "00", "10", "00", "10",
    ],
    size: new Size(5, 5),
    tileCode: tileCode
};
Maps.push(level5x5);
export { Maps, tileCode };
