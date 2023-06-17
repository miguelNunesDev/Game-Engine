import { Game } from './Game.js'
import { Canvas, Size, Vector } from './Types/types.js';

const Doc: any = document;
const canvas: Canvas | null = document.querySelector('#canvas');
if (!canvas) throw 'No canvas found';
Doc.game = Game.getInstance(canvas);
const game: Game = Doc.game;

document.addEventListener('DOMContentLoaded', () => {
    game.update();

});