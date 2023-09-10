import { Transform } from "../Modules/Transform.js";
import { Size } from "../Types/types.js";

export class CollisionManager {
    private static _instance: any
    collisionQueue: Array<Function>
    private constructor() {
        CollisionManager._instance = this;
        this.collisionQueue = [];
    }
    public static getInstance(): CollisionManager {
        if (!CollisionManager._instance) {
            CollisionManager._instance = new CollisionManager();
        }
        return CollisionManager._instance;
    }
    listen(collider: any, collided: any, f: Function): any {
        const collisionID = this.collisionQueue.length;
        this.collisionQueue.push(
            () => {
                const colliding = this.check(collider, collided);
                if (colliding) {
                    f(collider, collided);
                }
            }
        );
        return this.collisionQueue[collisionID];
    }
    update() {
        this.collisionQueue.forEach(collision => {
            collision();
        });
    }
    check(collider: Transform, collided: Transform): boolean {
        let colliding = {
            x: false,
            y: false
        };
        
        
        const collidedSize: Size = new Size(
            collided.position.x + collided.size.w,
            collided.position.y + collided.size.h
        );

        colliding = {
            x: collider.position.x > collided.position.x
                && collider.position.x < collidedSize.w,
            y: collider.position.y > collided.position.y
                && collider.position.y < collidedSize.h
        }

        if (collider.size) {
            const colliderSize = {
                x: collider.position.x + collider.size.w,
                y: collider.position.y + collider.size.h
            }
            colliding = {
                x: colliderSize.x > collided.position.x
                    && collider.position.x < collidedSize.w,
                y: colliderSize.y > collided.position.y
                    && collider.position.y < collidedSize.h
            }
        }
        
        
        return colliding.x && colliding.y;
    }
}