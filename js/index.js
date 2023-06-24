import { Game } from './Game.js';
import { Vector } from './Types/types.js';
import { Level } from './Components/Level.js';
import { Maps, tileCode } from './assets/maps.js';
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
    game.scene.current = new Level(Maps[0], tileCode);
    // game.camera.current.zoom = 0.5;
    game.camera.current.position = new Vector(10, 10);
    var level = game.scene.current;
});
