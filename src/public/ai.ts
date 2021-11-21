function getBestMove(data: number[]): number {
    let empty = [];
    for(let i = 0; i<data.length; i++) {
        if(data[i] == 0) {
            empty.push(i);
        }
    }
    return empty[Math.floor(Math.random()*empty.length)];
}

function evaluateMove(data: number[], pos: number, p: number) {
    let score: number = 0;

    for(let i = 0; i<offsets.length; i++) {
        let l = [0, 0];
        let opp = p == 1 ? 2 : 1;
        for(let j = 0; j>-5; j--) {
            if(data[pos+offsets[i]*j] == opp) {
                l[0] = j;
                break;
            }
        }
        for(let j = 1; j<5; j++) {
            if(data[pos+offsets[i]*j] == opp) {
                l[1] = j;
                break;
            }
        }       
       
        console.log(l[0], l[1]);
    }
}