var UIManager = /** @class */ (function () {
    function UIManager(_context) {
        this._context = _context;
        this._elements = [];
    }
    UIManager.getInstance = function (ctx) {
        if (!UIManager._instance && !ctx)
            console.error('No context provided');
        UIManager._instance = UIManager._instance
            ? UIManager._instance
            : new UIManager(ctx);
        return UIManager._instance;
    };
    UIManager.prototype.register = function (element) {
        var uid = Object.keys(this._elements).length;
        this._elements[uid] = element;
        return uid;
    };
    UIManager.prototype.render = function () {
        var _this = this;
        if (!this._elements.length)
            return;
        this._elements.forEach(function (element) {
            if (!element.visible)
                return;
            element.render(_this._context);
        });
    };
    return UIManager;
}());
export { UIManager };
