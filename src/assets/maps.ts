import { Size } from "../Types/types"

const tileCode = {
    0: 'blackTile',
    1: 'blankTile',
}
type IsoMap = {
    grid: Array<string>,
    size: Size,
    tileCode: {}
}
const Maps: Array<IsoMap> = []

const level5x5: IsoMap = {
    grid: [
        "00", "00", "00", "00", "00",
        "00", "00", "00", "00", "00",
        "00", "00", "00", "00", "00",
        "00", "00", "00", "00", "00",
        "00", "00", "00", "00", "00",
    ],
    size: new Size(5, 5),
    tileCode: tileCode
}
Maps.push(level5x5)