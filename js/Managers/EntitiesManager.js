var EntitiesManager = /** @class */ (function () {
    function EntitiesManager(ctx) {
        this.entities = [];
        this._context = ctx;
    }
    EntitiesManager.prototype.register = function (entity) {
        var uid = Object.keys(this.entities).length;
        this.entities[uid] = entity;
        return uid;
    };
    EntitiesManager.prototype.render = function () {
        var _this = this;
        if (!this.entities.length)
            return;
        this.entities.forEach(function (entity) {
            if (!entity.visible)
                return;
            entity.render(_this._context);
        });
    };
    return EntitiesManager;
}());
export { EntitiesManager };
//# sourceMappingURL=EntitiesManager.js.map