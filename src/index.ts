import { Game } from './Game.js'
import { Square } from './Primitives/Square.js';
import { Canvas, Size, Vector } from './Types/types.js';
import { Level } from './Components/Level.js';
import { Maps, tileCode } from './assets/maps.js';
import { Circle } from './Primitives/Circle.js';

const Doc: any = document;
const canvas: Canvas | null = document.querySelector('#canvas');
if (!canvas) throw 'No canvas found';
Doc.game = Game.getInstance(canvas);
const game: Game = Doc.game;

// ASSETS
game.asset.add('blank-tile','./assets/blank_tile.png');
game.asset.add('black-tile','./assets/black_tile.png');

document.addEventListener('DOMContentLoaded', () => {
    game.asset.load();
    game.update();
    // game.scene.current = new Level(Maps[0], tileCode);
    const circle = new Circle(new Vector(3), 40);
    // const square = new Square(new Vector(0), new Size(80), null, 'white', 'white');
    circle.visible = true;
    circle.event.on('hover', () => {
        console.log('hover');
        
    })
    game.debug.boundingBox(circle);
    // const level = game.scene.current as Level
    


});