"use strict";
const scoreTable = [
    [7],
    [5, 6],
    [4, 5],
    [2, 3, 4],
    [1],
    [0]
];
const maxDepth = 5;
const inf = Infinity;
function getBestMove(data) {
    return getBestMoveAdvanced(data, false, maxDepth, -inf, inf);
}
function getBestMoveAdvanced(data, player, depth, alpha, beta) {
    const p = +player + 1;
    const o = +(!player) + 1;
    const enemyEval = [Array(6).fill(0).map((x) => []), 5];
    const myEval = [Array(6).fill(0).map((x) => []), 5];
    for (let i = 0; i < data.length; i++) {
        if (data[i] != 0)
            continue;
        const priority = evaluateMove(data, i, o);
        enemyEval[0][priority].push(i);
        enemyEval[1] = Math.min(enemyEval[1], priority);
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i] != 0)
            continue;
        const priority = evaluateMove(data, i, p);
        myEval[0][priority].push(i);
        myEval[1] = Math.min(myEval[1], priority);
    }
    if (depth == 0) {
        if (myEval > enemyEval)
            return -scoreTable[myEval[1]][Math.min(myEval[0][myEval[1]].length, scoreTable[myEval[1]].length)];
        return scoreTable[enemyEval[1] + 1][Math.min(enemyEval[0][enemyEval[1] + 1].length, scoreTable[enemyEval[1] + 1].length)];
    }
    const bestMove = [-inf, -1];
    // check whether can the enemy do in one and we cant
    if (enemyEval[1] < myEval[1]) {
        // explore only defense moves of priority 0
        if (enemyEval[1] == 0) {
            // check if we are able to defend
            if (enemyEval[0][0].length > 1) {
                //not able to defend return worst score
                bestMove[0] = -scoreTable[0][0];
                bestMove[1] = enemyEval[0][0][0];
            }
            else {
                const pos = enemyEval[0][0][0];
                bestMove[1] = pos;
                data[pos] = p;
                bestMove[0] = getBestMoveAdvanced(data, !player, depth - 1, beta, alpha);
                data[pos] = 0;
            }
        }
        else {
            let i = enemyEval[1];
            if (enemyEval[1] > 2) {
                bestMove[0] = scoreTable[bestMove[1]][0];
                bestMove[1] = enemyEval[0][i][0];
            }
            else {
                for (let j = 0; j < enemyEval[0][i].length; j++) {
                    const pos = enemyEval[0][i][j];
                    data[pos] = o;
                    let score = getBestMoveAdvanced(data, !player, depth - 1, -beta, -alpha);
                    data[pos] = 0;
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha)
                        break;
                    if (score > bestMove[0]) {
                        bestMove[0] = score;
                        bestMove[1] = enemyEval[0][i][j];
                    }
                }
            }
        }
    }
    else {
        if (myEval[1] == 0) {
            bestMove[0] = scoreTable[0][0];
            bestMove[1] = myEval[0][0][0];
        }
        let sl = 2;
        let i = myEval[1];
        for (; i < 3 && sl > 0; i++) {
            if (myEval[0][i].length == 0)
                continue;
            for (let j = 0; j < myEval[0][i].length; j++) {
                const pos = myEval[0][i][j];
                data[pos] = p;
                let score = getBestMoveAdvanced(data, !player, depth - 1, -beta, -alpha);
                data[pos] = 0;
                alpha = Math.max(alpha, score);
                if (beta <= alpha)
                    break;
                if (score > bestMove[0]) {
                    bestMove[0] = score;
                    bestMove[1] = myEval[0][i][j];
                }
            }
            sl--;
        }
        if (bestMove[1] == -1) {
            bestMove[0] = scoreTable[i][0];
            bestMove[1] = myEval[0][i][0];
        }
    }
    if (depth == maxDepth) {
        console.log(bestMove[0]);
    }
    bestMove[0] = -bestMove[0];
    return bestMove[+(depth == maxDepth)];
}
function flr(v) {
    return v > 0 ? Math.floor(v) : Math.ceil(v);
}
function isCorner(p, offsetV) {
    let pV = [p % gs, flr(p / gs)];
    for (let i = 0; i < 2; i++) {
        pV[i] += offsetV[i];
        if (pV[i] == gs || pV[i] == -1)
            return true;
    }
    return false;
}
function evaluateMove(data, pos, player) {
    let priority = 5;
    data[pos] = player;
    for (let i = 0; i < offsets.length; i++) {
        function value(p) {
            return data[pos + p * offsets[i]];
        }
        let l = [-5, 5];
        let _l = [0, 0];
        let opp = player % 2 + 1;
        let count = -1;
        for (let j = 0; j < 2; j++) {
            let dir = j * 2 - 1;
            for (let k = 0; Math.abs(k) < 5; k += dir) {
                let e = false;
                switch (value(k)) {
                    case opp:
                        e = true;
                        break;
                    case 0:
                        if (_l[j] == 0)
                            _l[j] = k;
                        break;
                    case player:
                        if (_l[j] == 0)
                            count++;
                        break;
                }
                if (e || isCorner(pos + k * offsets[i], offsetsV[i * 2 + j])) {
                    l[j] = k + (+!e) * dir;
                    break;
                }
                ;
            }
            if (_l[j] == 0)
                _l[j] = l[j];
        }
        function getPriority(p, r, d, c, s) {
            for (; Math.abs(p) < Math.abs(l[+(d > 0)]) && value(p) == 0; p += d) {
                c--;
                s++;
                if (c == 0)
                    return s;
            }
            for (; Math.abs(p) < Math.abs(l[+(d > 0)]) && value(p) == player; p += d) {
                c--;
                if (c == 0)
                    return s;
            }
            if (p == l[+(d > 0)] && r == l[+!(d > 0)])
                return s;
            if (p == l[+(d > 0)])
                return getPriority(r, p, -d, c, s);
            if (r == l[+!(d > 0)])
                return getPriority(p, r, d, c, s);
            return Math.min(getPriority(p, r, d, c, s), getPriority(r, p, -d, c, s));
        }
        if (count >= 5) {
            priority = 0;
            break;
        }
        if (l[1] - l[0] > 5)
            priority = Math.min(Math.min(getPriority(_l[0], _l[1], -1, 5 - count, 0), getPriority(_l[1], _l[0], 1, 5 - count, 0)), priority);
    }
    data[pos] = 0;
    return priority;
}
