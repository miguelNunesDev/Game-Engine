export {};
// export class MouseManager {
//     position: Vector;
//     lastPosition: Vector;
//     state: CursorState;
//     actions: { [key in CursorState]: Array<Function> };
//     distance: Vector;
//     debug: Circle;
//     constructor(canvas: HTMLCanvasElement) {
//         this.state = CursorState.PRIMARY_UP;
//         this.distance;
//         this.position = new Vector(0, 0);
//         this.actions = {
//             0: [],
//             1: [],
//             2: [],
//             3: [],
//             4: []
//         };
//         this.initListeners(canvas);
//     }
//     initListeners(canvas: HTMLCanvasElement) {
//         canvas.addEventListener('mousedown', () => {
//             this.state = CursorState.PRIMARY_DOWN;
//             this.actions[CursorState.PRIMARY_DOWN].forEach(action => {
//                 action();
//             });
//         })
//         canvas.addEventListener('touchmove', () => {
//             this.state = CursorState.PRIMARY_DOWN;
//             this.actions[CursorState.PRIMARY_DOWN].forEach(action => {
//                 action();
//             });
//         }, { passive: false })
//         canvas.addEventListener('dragstart', (e) => {
//             e.preventDefault();
//             this.state = CursorState.PRIMARY_DOWN;
//             this.actions[CursorState.PRIMARY_DOWN].forEach(action => {
//                 action();
//             });
//         })
//         canvas.addEventListener('dragend', () => {
//             this.state = CursorState.PRIMARY_UP;
//             this.actions[CursorState.PRIMARY_UP].forEach(action => {
//                 action();
//             });
//         })
//         canvas.addEventListener('mouseleave', () => {
//             this.state = CursorState.PRIMARY_UP;
//             this.actions[CursorState.PRIMARY_UP].forEach(action => {
//                 action();
//             });
//         })
//         canvas.addEventListener('mouseup', () => {
//             this.state = CursorState.PRIMARY_UP;
//             this.actions[CursorState.PRIMARY_UP].forEach(action => {
//                 action();
//             });
//         })
//         canvas.addEventListener('mousemove', (e) => {
//             this.lastPosition = this.lastPosition || this.position;
//             this.position = {
//                 x: e.clientX - Game.position.x,
//                 y: e.clientY - Game.position.y
//             }
//             requestAnimationFrame(() => {
//                 const distance: Vector = {
//                     x: this.position.x - this.lastPosition.x,
//                     y: this.position.y - this.lastPosition.y,
//                 }
//                 this.lastPosition = this.position;
//                 this.distance = distance;
//             })
//         })
//     }
//     addAction(f: Function, type: CursorState) {
//         this.actions[type].push(f);
//     }
// }
