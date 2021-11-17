class Game {
    data: boolean[][] = [];
    turn: boolean = false;

    contructor() {
        this.data = new Array(16).fill(new Array(16).fill(false));
    }

    play(x: number, y: number) {
        this.turn = !this.turn;
    }
}