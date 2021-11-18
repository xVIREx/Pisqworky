enum Field {
    empty,
    circle,
    cross
}

const gs: number = 16;

class Game {
    data: Field[] = [];
    turn: boolean = false;

    constructor() {
        this.data = Array(256).fill(0);
    }

    play(x: number, y: number) {
        this.data[x+y*gs] = this.turn ? 1 : 2;
        this.turn = !this.turn;
    }

    isValid(x: number, y: number) {
        return this.data[x+y*gs] == Field.empty;
    }

    
}