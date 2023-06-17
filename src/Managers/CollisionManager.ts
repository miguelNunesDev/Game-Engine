import { Entity } from "../Primitives/Entity";
import { Size } from "../Types/types";

type Collision = {
    function: Function,
    detected: boolean
}
export class CollisionManager {
    private static _instance: any
    collisionQueue: Array<Collision>
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
            {
                function: () => {
                    const colliding = this.check(collider, collided);
                    if (colliding) {
                        f(collider, collided);
                    }
                    return colliding;
                },
                detected: false
            }
        );
        return this.collisionQueue[collisionID];
    }
    update() {
        this.collisionQueue.forEach(collision => {
            collision.detected = collision.function();
        });
    }
    check(collider: Entity, collided: Entity): boolean {
        let colliding = {
            x: false,
            y: false
        };
        const collidedSize: Size = {
            w: collided.position.world.x + collided.size.w,
            h: collided.position.world.y + collided.size.h
        }

        colliding = {
            x: collider.position.world.x > collided.position.world.x
                && collider.position.world.x < collidedSize.w,
            y: collider.position.world.y > collided.position.world.y
                && collider.position.world.y < collidedSize.h
        }

        if (collider.size) {
            const colliderSize = {
                x: collider.position.world.x + collider.size.w,
                y: collider.position.world.y + collider.size.h
            }
            colliding = {
                x: colliderSize.x > collided.position.world.x
                    && collider.position.world.x < collidedSize.w,
                y: colliderSize.x > collided.position.world.y
                    && collider.position.world.y < collidedSize.h
            }
        }
        return colliding.x && colliding.y;
    }
}