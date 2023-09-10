import { Size, Vector } from "./transform.js";
var CursorState;
(function (CursorState) {
    CursorState[CursorState["PRIMARY_DOWN"] = 0] = "PRIMARY_DOWN";
    CursorState[CursorState["PRIMARY_UP"] = 1] = "PRIMARY_UP";
    CursorState[CursorState["SECONDARY_DOWN"] = 2] = "SECONDARY_DOWN";
    CursorState[CursorState["SECONDARY_UP"] = 3] = "SECONDARY_UP";
    CursorState[CursorState["MOVE"] = 4] = "MOVE";
    CursorState[CursorState["IDLE"] = 5] = "IDLE";
    CursorState[CursorState["DRAG"] = 6] = "DRAG";
    CursorState[CursorState["LEAVE"] = 7] = "LEAVE";
})(CursorState || (CursorState = {}));
export { Vector, CursorState, Size };
