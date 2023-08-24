// import { lerpLine, lerp } from "../Helper.js";
// import { ActionState, Context, Magnitude, Size, Vector } from "../Types/types.js";
// import { Line } from "./Line.js";
// import { Entity } from "./Entity.js";
// import { Handler } from "../Handler.js";
// import { Game } from "../Game.js";
// import { DebugManager } from "../Managers/DebugManager.js";
// type DrawType = {
//     cubic: Function,
//     cuadratic: Function,
//     curve: Function
// }
// // TODO: MAS ROTO QUE MIS SUEÑOS Y ESPERANZAS
// export class Spline extends Entity {
//     line: Line
//     handler: Handler;
//     type: string;
//     drawType: DrawType;
//     weightHandler: { left: Handler, right: Handler };
//     sections: Array<Line>
//     constructor(from: Vector, to: Vector, type: string = 'bezier') {
//         const line = new Line(from, to);
//         super(line.position.world, line.size);
//         this.line = line;
//         this.line.parent = this;
//         this.handler = new Handler(this.center, new Size(15), this, 'square', 'purple');
//         this.weightHandler = {
//             left: new Handler(Vector.zero(), new Size(10), this.handler, 'circle', 'blue'),
//             right: new Handler(Vector.zero(), new Size(10), this.handler, 'circle', 'blue')
//         }
//         this.weightHandler.left.on(ActionState.HOVER, () => {
//         })
//         this.weightHandler.right.on(ActionState.HOVER, () => {
//         })
//         this.type = type;
//         this.drawType = {
//             cuadratic: this.drawCuadratic,
//             cubic: this.drawCubic,
//             curve: this.drawCurve
//         }
//         this.sections = []
//         if (this.type === 'curve') {
//             this.sections.push(new Line(this.line.pi, this.line.center, false, this, 'purple'))
//             this.sections.push(new Line(this.line.center, this.line.pf, false, this, 'brown'))
//             this.weightHandler.left.setPosition(lerpLine(this.sections[0], 0.5));
//             this.weightHandler.right.setPosition(lerpLine(this.sections[1], 0.5));
//             this.sections[0].visible = false;
//             this.sections[1].visible = false;
//         }
//         this.handler.on(ActionState.CLICKED, () => {
//             this.sections[0].pf = this.handler.center;
//             this.sections[1].pi = this.handler.center;
//         })
//     }
//     public drawCubic(ctx: Context, color: string = 'black') {
//         // const leftLine = {
//         //     from: this.line.pi,
//         //     to: this.handler.center
//         // };
//         // const rigthLine = {
//         //     from: this.handler.center,
//         //     to: this.line.pf
//         // }
//         // ctx.beginPath();
//         // for (let i = 0; i < 1; i += 0.01) {
//         //     const left_t = lerpLine(leftLine, i);
//         //     const right_t = lerpLine(rigthLine, i);
//         //     const middleLine = {
//         //         from: left_t,
//         //         to: right_t
//         //     }
//         //     const middle_t = lerpLine(middleLine, i);
//         //     ctx.lineTo(middle_t.x, middle_t.y);
//         //     ctx.moveTo(middle_t.x, middle_t.y);
//         // }
//         // ctx.strokeStyle = color;
//         // ctx.stroke();
//     }
//     public drawCuadratic(ctx: Context, color: string = 'black', _line: { pi: Vector, pf: Vector }, handler: Handler): any {
//         const line: any = _line;
//         const debug = DebugManager.getInstance()
//         // line.center = lerpLine(line, 0.5)
//         const point1 = lerp(
//             new Vector(line.pi.x, handler.position.world.y),
//             handler.position.world,
//             0.5
//         );
//         const point2 = lerp(
//             handler.position.world,
//             new Vector(line.center.x, handler.position.world.y),
//             0.5
//         );
//         debug.line(line.pi, point1, 'green')
//         debug.line(point1, point2, 'red')
//         debug.line(point2, line.pf, 'black')
//         // B - C + (B - C * 0.5)
//         ctx.beginPath();
//         // ctx.moveTo(line.pi.x, line.pf.y);
//         for (let i = 0; i < 1; i += 0.01) {
//             const tA = lerp(line.pi, point1, i);
//             const tB = lerp(point1, point2, i);
//             const tC = lerp(point2, line.pf, i);
//             const tD = lerp(tA, tB, i);
//             const tE = lerp(tB, tC, i);
//             const tFinal = lerp(tD, tE, i);
//             ctx.lineTo(tFinal.x, tFinal.y);
//             ctx.moveTo(tFinal.x, tFinal.y);
//         }
//         ctx.strokeStyle = color;
//         ctx.stroke();
//         return line.center;
//     }
//     public drawCurve(ctx: Context, color: string = 'black') {
//         this.drawCuadratic(ctx, 'blue', this.sections[0], this.weightHandler.left);
//         this.drawCuadratic(ctx, 'red', this.sections[1], this.weightHandler.right);
//     }
//     public draw(ctx: Context) {
//         this.drawType[this.type as keyof DrawType].bind(this)(ctx, 'black');
//     }
//     public render(ctx: Context): void {
//         this.draw(ctx)
//         // this.debugCubic(ctx);
//     }
// }
