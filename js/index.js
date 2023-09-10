import { Game } from './engine/Game.js';
import { CursorState, Vector } from './engine/Types/types.js';
import { Circle } from './engine/Primitives/Circle.js';
import { Cursor } from './engine/Primitives/Cursor.js';
import { Line } from './engine/Primitives/Line.js';
var Doc = document;
var canvas = document.querySelector('#canvas');
if (!canvas)
    throw 'No canvas found';
Doc.game = Game.getInstance(canvas);
var game = Doc.game;
// ASSETS
game.asset.add('blank-tile', './assets/blank_tile.png');
game.asset.add('black-tile', './assets/black_tile.png');
document.addEventListener('DOMContentLoaded', function () {
    game.init();
    // game.scene.current = new Level(Maps[0], tileCode);
    var circle = new Circle(0, null, 80, { fill: ['orange'], stroke: ['red'] });
    // const square = new Square(new Vector(0), new Size(80), null, 'white', 'white');
    var debugLine = new Line(Vector.zero, Vector.zero, null, null, 'gray');
    var moveController = new Circle(15, 420, 80, { fill: ['white', 0.5], stroke: ['white', 3] });
    var id = moveController.container.addChild(new Circle(moveController.transform.center.x - 20, moveController.transform.center.y - 20, 20, { fill: ['white'] }));
    var handler = moveController.container.getChild(id);
    var direction = Vector.zero;
    var speed = 1.5;
    moveController.event.on('clickUp', function () {
        debugLine.pi = handler.transform.center;
        debugLine.pf = Cursor.getInstance().transform.position;
        var pos = Vector.mult(Cursor.getInstance().transform.position.normalize, handler.radius);
        var finalPos = Vector.add(pos, handler.transform.center);
        console.log({
            normal: Cursor.getInstance().transform.position.normalize, cursor: Cursor.getInstance().transform.position,
            pos: pos,
            finalPos: finalPos,
            radius: handler.radius
        });
        // handler.transform.center = finalPos;
        var delta = Vector.sub(moveController.transform.center, handler.transform.center);
        direction = Vector.div(delta, moveController.radius);
        circle.transform.move(new Vector(direction.x * speed * -1, direction.y * speed * -1));
    });
    game.cursor.on(CursorState.PRIMARY_UP, function () {
        handler.transform.position = Vector.sub(moveController.transform.center, 20);
    });
    game.debug.transform(moveController);
    circle.event.keyLayout = {
        up: ['w', 'ArrowUp'],
        down: ['s', 'ArrowDown'],
        left: ['a', 'ArrowLeft'],
        right: ['d', 'ArrowRight'],
    };
    game.debug.transform(circle);
    // const square = new Square({ position: new Vector(60), size: new Size(50) }, null, 'white', 'green');
    circle.event.onKeyEvent('up', function () {
        circle.transform.move(new Vector(0, -2));
    });
    circle.event.onKeyEvent('down', function () {
        circle.transform.move(new Vector(0, 2));
    });
    circle.event.onKeyEvent('left', function () {
        circle.transform.move(new Vector(-2, 0));
    });
    circle.event.onKeyEvent('right', function () {
        circle.transform.move(new Vector(2, 0));
    });
});
