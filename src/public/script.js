"use strict";
const canvas = document.querySelector("canvas");
var mp;
canvas.onresize = () => {
    mp = (window.innerHeight * 0.8) / GRID_SIZE; /* should cover 80% of page */
    canvas.width = mp * GRID_SIZE;
    canvas.height = mp * GRID_SIZE;
};
const drawer = new Drawer(canvas.getContext('2d'));
const game = new Game();
const GRID_SIZE = 16;
drawer.grid(GRID_SIZE, mp);
