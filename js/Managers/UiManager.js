export {};
// export class UiManager {
//     private _queue: UIqueue
//     private static _intance: UiManager
//     private constructor() {
//         this._queue;
//     }
//     public static getIntance = () => UiManager._intance ? UiManager._intance : new UiManager();
//     public queue: Function = (panel: Panel) => this._queue.push(panel);
//     public render() {
//         this._queue.forEach(panel => {
//             panel.element.innerHTML = panel.content.reduce((prevVal, currentVal): string => {
//                 return prevVal += `<br> ${currentVal}`
//             })
//         })
//     }
// }
