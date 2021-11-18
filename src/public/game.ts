enum Field {
    empty,
    circle,
    cross
}


const gs: number = 16;

const offsets: number[] = [1, gs+1, gs, gs-1];


class Game {
    data: Field[] = [];
    turn: boolean = false;

    constructor() {
        this.data = Array(gs*gs).fill(0);
    }

    play(pos: number) {
        this.data[pos] = this.turn ? 1 : 2;
        this.turn = !this.turn;
    }

    isValid(pos: number) {
        return pos >= 0 && pos < 256 && this.data[pos] == Field.empty;
    }

    
}