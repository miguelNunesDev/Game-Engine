import { Game } from './Game.js';
import { Vector } from './Types/types.js';
import { Circle } from './Primitives/Circle.js';
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
    game.asset.load();
    game.update();
    // game.scene.current = new Level(Maps[0], tileCode);
    var circle = new Circle(new Vector(3), 40);
    // const square = new Square(new Vector(0), new Size(80), null, 'white', 'white');
    circle.visible = true;
    circle.event.on('hover', function () {
        console.log('hover');
    });
    game.debug.boundingBox(circle);
    // const level = game.scene.current as Level
});
