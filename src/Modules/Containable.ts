import { World } from "../Primitives/World.js";
import { Container, Vector } from "../Types/types.js";


export class Containable {
    constructor(
        private _entity: Container,
        private _parent: Container = World.getInstance(),
        private _childs: Map<number, Container> = new Map()
    ) {        
        this._parent?.container.addChild(this._entity);
        this.setChildsTransformListeners();
    }

    setChildsTransformListeners() {
        this._entity?.transform.on(this.moveChilds, 'position');
    }
    set parent(parent: Container) { this._parent = parent; }
    get parent() { return this._parent };

    get childs() { return this._childs };
    set childs(childs: Map<number, Container>) {
        this._childs = childs;
        this._childs.forEach((child) => { child.container.parent = this._entity })
    }
    addChild(child: Container) {
        const key = this._childs.size;
        this._childs.set(key, child);
        return key
    }
    getChild(id: number) {
        return this.childs.get(id);
    }
    setChild(id: number, child: Container) {
        this._childs.set(id, child);
    }

    setChildsVisibility(bol: boolean) {
        if (!this._childs) return;
        this._childs.forEach(child => {
            if (!child.visibility) return;
            child.visibility = bol;
        })
    }
    moveChilds = (pos: Vector) => {  
        if(!this._entity?.transform)return;
        const delta = Vector.sub(pos, this._entity.transform.position);
        this._childs?.forEach(child => {
            if(!child || !child.transform) return;
            child.transform.position = Vector.add(child.transform.position, delta);
        })
    }
    setChildsPositions(pos: Vector) {
        this._childs.forEach(child => {
            if (!child.transform) return;
            child.transform.localPosition = pos;
        })
    }
}