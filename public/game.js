"use strict";
class Game {
    constructor() {
        this.data = [];
        this.turn = false;
    }
    contructor() {
        this.data = new Array(16).fill(new Array(16).fill(false));
    }
    play(x, y) {
        this.turn = !this.turn;
    }
}
