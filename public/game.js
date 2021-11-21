"use strict";
var Field;
(function (Field) {
    Field[Field["empty"] = 0] = "empty";
    Field[Field["circle"] = 1] = "circle";
    Field[Field["cross"] = 2] = "cross";
})(Field || (Field = {}));
const gs = 16;
const offsets = [1, gs + 1, gs, gs - 1];
class Game {
    constructor() {
        this.data = [];
        this.turn = false;
        this.data = Array(gs * gs).fill(0);
    }
    play(pos) {
        this.data[pos] = this.turn ? 1 : 2;
        this.turn = !this.turn;
    }
    isValid(pos) {
        return pos >= 0 && pos < 256 && this.data[pos] == Field.empty;
    }
    checkWin(pos) {
        const v = this.data[pos];
        for (let i = 0; i < offsets.length; i++) {
            let c = 0;
            for (let j = 0; j < 5; j++) {
                if (this.data[pos + offsets[i] * j] != v)
                    break;
                c++;
            }
            for (let j = -1; j > -5; j--) {
                if (this.data[pos + offsets[i] * j] != v)
                    break;
                c++;
            }
            if (c >= 5)
                return true;
        }
        return false;
    }
}
