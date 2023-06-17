import { Game } from './Game.js';
var Doc = document;
var canvas = document.querySelector('#canvas');
if (!canvas)
    throw 'No canvas found';
Doc.game = Game.getInstance(canvas);
var game = Doc.game;
document.addEventListener('DOMContentLoaded', function () {
    game.update();
});
//# sourceMappingURL=index.js.map