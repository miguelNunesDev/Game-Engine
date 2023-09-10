import { Game } from './engine/Game.js'
import { Canvas, CursorState, Size, Vector } from './engine/Types/types.js';
import { Circle } from './engine/Primitives/Circle.js';
import { UIText } from './engine/Primitives/UI.js';
import { Square } from './engine/Primitives/Square.js';
import { Cursor } from './engine/Primitives/Cursor.js';
import { Line } from './engine/Primitives/Line.js';

const Doc: any = document;
const canvas: Canvas | null = document.querySelector('#canvas');
if (!canvas) throw 'No canvas found';
Doc.game = Game.getInstance(canvas);
const game: Game = Doc.game;

// ASSETS
game.asset.add('blank-tile', './assets/blank_tile.png');
game.asset.add('black-tile', './assets/black_tile.png');

document.addEventListener('DOMContentLoaded', () => {
    game.init();
    // game.scene.current = new Level(Maps[0], tileCode);
    const circle = new Circle(0, null, 80, { fill: ['orange'], stroke: ['red'] });
    // const square = new Square(new Vector(0), new Size(80), null, 'white', 'white');
    const debugLine = new Line(Vector.zero,Vector.zero,null, null, 'gray');
    const moveController = new Circle(15, 420, 80, { fill: ['white', 0.5], stroke: ['white', 3] });
    const id = moveController.container.addChild(new Circle(
        moveController.transform.center.x - 20,
        moveController.transform.center.y - 20,
        20, { fill: ['white'] }
    ));
    const handler = moveController.container.getChild(id) as Circle;
    let direction = Vector.zero;
    const speed = 1.5;

    moveController.event.on('clickUp', () => {
        debugLine.pi = handler.transform.center;
        debugLine.pf = Cursor.getInstance().transform.position;
        const pos = Vector.mult(Cursor.getInstance().transform.position.normalize, handler.radius);
        const finalPos = Vector.add(pos, handler.transform.center)
        console.log({
            normal: Cursor.getInstance().transform.position.normalize, cursor: Cursor.getInstance().transform.position,
            pos,
            finalPos,
            radius: handler.radius
        });
        // handler.transform.center = finalPos;


        const delta = Vector.sub(moveController.transform.center, handler.transform.center);

        direction = Vector.div(delta, moveController.radius);

        circle.transform.move(new Vector(direction.x * speed * -1, direction.y * speed * -1))

    })
    game.cursor.on(CursorState.PRIMARY_UP, () => {
        handler.transform.position = Vector.sub(moveController.transform.center, 20)
    })
    game.debug.transform(moveController);

    circle.event.keyLayout = {
        up: ['w', 'ArrowUp'],
        down: ['s', 'ArrowDown'],
        left: ['a', 'ArrowLeft'],
        right: ['d', 'ArrowRight'],
    }
    game.debug.transform(circle);

    // const square = new Square({ position: new Vector(60), size: new Size(50) }, null, 'white', 'green');
    circle.event.onKeyEvent('up', () => {
        circle.transform.move(new Vector(0, -2));
    })
    circle.event.onKeyEvent('down', () => {
        circle.transform.move(new Vector(0, 2));
    })
    circle.event.onKeyEvent('left', () => {
        circle.transform.move(new Vector(-2, 0));
    })
    circle.event.onKeyEvent('right', () => {
        circle.transform.move(new Vector(2, 0));
    })

});