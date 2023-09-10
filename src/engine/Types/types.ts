import { Containable } from "../Modules/Containable";
import { Transform } from "../Modules/Transform";
import { Size, Vector } from "./transform.js";

type UID = number;
type Magnitude = number;
type Rad = number;
type Angle = 'degre' | 'radian'

type Panel = {
    element: HTMLElement,
    content: Array<string>
}
type Container = { container: Containable, visibility?: boolean, transform: Transform }

type TileSize = number;

type IsoMap = {
    grid: Array<string>,
    size: Size,
    tileCode: {}
}
type Space = "world" | "local";

type Image = CanvasImageSource

type boundingBox = {
    position: Vector
    size: Size
}
type localVector = Vector;
type worldVector = Vector;


type HandlerState = 'hover' | 'clicked' | "resting";

type CursorType = "touch" | "mouse";

enum CursorState {
    PRIMARY_DOWN,
    PRIMARY_UP,
    SECONDARY_DOWN,
    SECONDARY_UP,
    MOVE,
    IDLE,
    DRAG,
    LEAVE,
}
type TransformEvents = 'change' | 'position' | 'rotate' | 'scale'

type Context = CanvasRenderingContext2D;
type Canvas = HTMLCanvasElement;

export {
    TransformEvents,
    Vector,
    HandlerState,
    CursorType,
    CursorState,
    Context,
    Canvas,
    Size,
    Panel,
    UID,
    Space,
    Magnitude,
    Rad,
    boundingBox,
    localVector,
    worldVector,
    Image,
    IsoMap,
    TileSize,
    Container,
    Angle
}