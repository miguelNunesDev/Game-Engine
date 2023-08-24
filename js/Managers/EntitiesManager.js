var EntitiesManager = /** @class */ (function () {
    function EntitiesManager(_context) {
        this._context = _context;
        this.entities = [];
    }
    EntitiesManager.getInstance = function (ctx) {
        if (!EntitiesManager._instance && !ctx)
            console.error('No context provided');
        EntitiesManager._instance = EntitiesManager._instance
            ? EntitiesManager._instance
            : new EntitiesManager(ctx);
        return EntitiesManager._instance;
    };
    EntitiesManager.prototype.register = function (entity) {
        var uid = Object.keys(this.entities).length;
        this.entities[uid] = entity;
        return uid;
    };
    EntitiesManager.prototype.render = function () {
        var _this = this;
        if (!this.entities.length)
            return;
        this.entities.sort(function (a, b) {
            return a.depth - b.depth;
        });
        this.entities.forEach(function (entity) {
            if (!entity.visible)
                return;
            entity.render(_this._context);
        });
    };
    return EntitiesManager;
}());
export { EntitiesManager };
