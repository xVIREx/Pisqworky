class SimulatedBoard {
    priority = [5, 5];
    priorityMoves: number[][][];
    data: number[];

    constructor(data: number[]) {
        this.data = data;
    }
}

interface MoveEvaluation {
    priorityMoves: number[][]
}

const maxDepth = 2;

function getBestMove(depth: number, board: SimulatedBoard, p: boolean): number | number[]{
    
    let bestMove;
    let bestScore;

    if(depth < maxDepth) {
        for(let i = 0; i<board.data.length; i++) {
            const eval: MoveEvaluation = evaluateMove(board.data, i, p, 3);
            for(let j = 0; j<eval.priorityMoves.length; j++) {
                board.priorityMoves[+p][j].push(...eval.priorityMoves[j])
            }
            bestMove = i;
            bestScore = getBestMove(depth+1, board, !p);            
            for(let j = 0; j<eval.priorityMoves.length; j++) {
                board.priorityMoves[+p][j].length -= eval.priorityMoves[j].length;
            }
        }
    }else {

        return bestScore;
    }
}

function evaluateMove(data: number[], pos: number, p: boolean, priorityLimit: number) {
    let score: number[] = [priorityLimit, 0];

    for(let i = 0; i<offsets.length; i++) {
        let l = [0, 0];
        let opp = p ? 2 : 1;
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
       
        let e = score[0];

        function evaluatePriority() {
            
        }
    }
}

