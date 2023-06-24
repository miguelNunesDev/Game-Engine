var CollisionManager = /** @class */ (function () {
    function CollisionManager() {
        CollisionManager._instance = this;
        this.collisionQueue = [];
    }
    CollisionManager.getInstance = function () {
        if (!CollisionManager._instance) {
            CollisionManager._instance = new CollisionManager();
        }
        return CollisionManager._instance;
    };
    CollisionManager.prototype.listen = function (collider, collided, f) {
        var _this = this;
        var collisionID = this.collisionQueue.length;
        this.collisionQueue.push({
            function: function () {
                var colliding = _this.check(collider, collided);
                if (colliding) {
                    f(collider, collided);
                }
                return colliding;
            },
            detected: false
        });
        return this.collisionQueue[collisionID];
    };
    CollisionManager.prototype.update = function () {
        this.collisionQueue.forEach(function (collision) {
            collision.detected = collision.function();
        });
    };
    CollisionManager.prototype.check = function (collider, collided) {
        var colliding = {
            x: false,
            y: false
        };
        var collidedSize = {
            w: collided.position.world.x + collided.size.w,
            h: collided.position.world.y + collided.size.h
        };
        colliding = {
            x: collider.position.world.x > collided.position.world.x
                && collider.position.world.x < collidedSize.w,
            y: collider.position.world.y > collided.position.world.y
                && collider.position.world.y < collidedSize.h
        };
        if (collider.size) {
            var colliderSize = {
                x: collider.position.world.x + collider.size.w,
                y: collider.position.world.y + collider.size.h
            };
            colliding = {
                x: colliderSize.x > collided.position.world.x
                    && collider.position.world.x < collidedSize.w,
                y: colliderSize.x > collided.position.world.y
                    && collider.position.world.y < collidedSize.h
            };
        }
        return colliding.x && colliding.y;
    };
    return CollisionManager;
}());
export { CollisionManager };
