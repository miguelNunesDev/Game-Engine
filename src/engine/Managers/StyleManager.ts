import { Gradient, ObjectStyle, TextStyle } from "../Types/styles";
import { TransformData } from "../Types/transform";
import { Context, UID } from "../Types/types";

export class StyleManager {
    styles: Array<ObjectStyle | TextStyle>;
    private static _instance: StyleManager
    private static _context: Context
    private constructor(_context: Context) {
        this.styles = [];
        StyleManager._context = _context
    }
    public static getInstance(ctx?: Context): StyleManager {
        if (!StyleManager._instance && !ctx) console.error('No context provided');

        StyleManager._instance = StyleManager._instance
            ? StyleManager._instance
            : new StyleManager(ctx);

        return StyleManager._instance
    }
    register(style: ObjectStyle | TextStyle): UID {
        const uid = Object.keys(this.styles).length as UID;
        this.styles[uid] = style;
        return uid;

    }
    public static getGradient(gradient: Gradient, data: TransformData) {
        console.log('todo');
        
    }
}