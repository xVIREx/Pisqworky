"use strict";
var Field;
(function (Field) {
    Field[Field["empty"] = 0] = "empty";
    Field[Field["circle"] = 1] = "circle";
    Field[Field["cross"] = 2] = "cross";
})(Field || (Field = {}));
const gs = 16;
class Game {
    constructor() {
        this.data = [];
        this.turn = false;
        this.data = Array(256).fill(0);
    }
    play(x, y) {
        this.data[x + y * gs] = this.turn ? 1 : 2;
        this.turn = !this.turn;
    }
    isValid(x, y) {
        return this.data[x + y * gs] == Field.empty;
    }
}
