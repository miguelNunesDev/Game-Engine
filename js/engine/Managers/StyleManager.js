var StyleManager = /** @class */ (function () {
    function StyleManager(_context) {
        this.styles = [];
        StyleManager._context = _context;
    }
    StyleManager.getInstance = function (ctx) {
        if (!StyleManager._instance && !ctx)
            console.error('No context provided');
        StyleManager._instance = StyleManager._instance
            ? StyleManager._instance
            : new StyleManager(ctx);
        return StyleManager._instance;
    };
    StyleManager.prototype.register = function (style) {
        var uid = Object.keys(this.styles).length;
        this.styles[uid] = style;
        return uid;
    };
    StyleManager.getGradient = function (gradient, data) {
        console.log('todo');
    };
    return StyleManager;
}());
export { StyleManager };
