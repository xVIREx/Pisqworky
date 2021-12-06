enum Field {
    empty,
    circle,
    cross
}


const gs: number = 16;

const offsets: number[] = [1, gs+1, gs, gs-1];
const offsetsV: number[][] = [[-1, 0], [1, 0], [-1, -1], [1, 1], [0, -1], [0, 1], [1, -1], [-1, 1]];


class Game {
    data: Field[] = [];
    turn: boolean = false;

    constructor() {
        this.data = Array(gs*gs).fill(0);
    }

    play(pos: number) {
        this.data[pos] = +this.turn + 1;
        this.turn = !this.turn;
    }

    isValid(pos: number) {
        return pos >= 0 && pos < gs*gs && this.data[pos] == Field.empty;
    }

    checkWin(pos: number) {
        const v = this.data[pos];
        for(let i = 0; i<offsets.length; i++) {
            let c: number = 0;
            for(let j = 0; j<5; j++) {
                let p: number = pos+offsets[i]*j;
                if(this.data[p] != v) break;
                c++;

            }
            for(let j = -1; j>-5; j--) {
                let p: number = pos+offsets[i]*j;
                if(this.data[p] != v) break;
                c++;
                 
            }
            if(c>=5) return true;
        }
        return false;
    }
}