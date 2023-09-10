import { UI } from "../Primitives/UI.js";
import { Context, Panel, UID } from "../Types/types.js";



export class UIManager {
    private static _instance: UIManager
    private _elements: Array<UI>
    private constructor(private _context: Context) {
        this._elements= []
    }
    public static getInstance(ctx?: Context): UIManager {
        if (!UIManager._instance && !ctx) console.error('No context provided');

        UIManager._instance = UIManager._instance
            ? UIManager._instance
            : new UIManager(ctx as Context);

        return UIManager._instance
    }
    register(element: UI): UID {
        const uid = Object.keys(this._elements).length as UID;
        this._elements[uid] = element;
        return uid;

    }
    render() {
        if (!this._elements.length) return;
        this._elements.forEach( element => {
            if (!element.visible) return;            
            element.render(this._context)
        });
    }
}
