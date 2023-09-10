import { IsoMap, Size } from "../engine/Types/types.js"

const tileCode = {
    0: 'black-tile',
    1: 'blank-tile',
}

const Maps: Array<IsoMap> = []

const level5x5: IsoMap = {
    grid: [
        "10", "00", "10", "00", "10",
        "00", "10", "00", "10", "00",
        "10", "00", "10", "00", "10",
        "00", "10", "00", "10", "00",
        "10", "00", "10", "00", "10",
    ],
    size: new Size(5, 5),
    tileCode: tileCode
}
Maps.push(level5x5)

export { Maps, tileCode };