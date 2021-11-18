"use strict";
const canvas = document.querySelector("canvas");
var mp;
const drawer = new PisqworkyDrawer(canvas.getContext('2d'), mp, 16, 0.5);
let game = new Game();
const GRID_SIZE = 16;
function windowResized() {
    mp = (Math.min(window.innerHeight, window.innerWidth) * 0.8) / GRID_SIZE; /* should cover 80% of page */
    canvas.width = mp * GRID_SIZE;
    canvas.height = mp * GRID_SIZE;
    drawer.mp = mp;
    drawer.background();
    drawer.gridReconstruct(game.data);
}
function mouseClicked(e) {
    const offset = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - offset.left) / mp);
    const y = Math.floor((e.clientY - offset.top) / mp);
    if (!game.isValid(x, y))
        return;
    if (game.turn) {
        drawer.circle(x, y);
    }
    else {
        drawer.cross(x, y);
    }
    game.play(x, y);
}
canvas.onclick = mouseClicked;
window.onresize = windowResized;
windowResized();
