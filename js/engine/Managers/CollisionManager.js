import { Size } from "../Types/types.js";
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
        this.collisionQueue.push(function () {
            var colliding = _this.check(collider, collided);
            if (colliding) {
                f(collider, collided);
            }
        });
        return this.collisionQueue[collisionID];
    };
    CollisionManager.prototype.update = function () {
        this.collisionQueue.forEach(function (collision) {
            collision();
        });
    };
    CollisionManager.prototype.check = function (collider, collided) {
        var colliding = {
            x: false,
            y: false
        };
        var collidedSize = new Size(collided.position.x + collided.size.w, collided.position.y + collided.size.h);
        colliding = {
            x: collider.position.x > collided.position.x
                && collider.position.x < collidedSize.w,
            y: collider.position.y > collided.position.y
                && collider.position.y < collidedSize.h
        };
        if (collider.size) {
            var colliderSize = {
                x: collider.position.x + collider.size.w,
                y: collider.position.y + collider.size.h
            };
            colliding = {
                x: colliderSize.x > collided.position.x
                    && collider.position.x < collidedSize.w,
                y: colliderSize.y > collided.position.y
                    && collider.position.y < collidedSize.h
            };
        }
        return colliding.x && colliding.y;
    };
    return CollisionManager;
}());
export { CollisionManager };
