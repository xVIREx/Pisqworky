function getBestMove(data: number[]): number {
    let player = 1;
    

}

function getBestMoveAdvanced(data: number[], player: boolean): number {
    const p = +player+1;
    const o = +player;

    let score = [0, 0];
    let positions = Array(5).fill([]);

    for(let i  = 0; i<data.length; i++) {
        
    }

}

function flr(v: number) {
    return v>0 ? Math.floor(v) : Math.ceil(v);
}

function isCorner(p: number, offsetV: number[]): Boolean {
    let pV: number[] = [p%gs, flr(p/gs)];

    for(let i = 0; i<2; i++) {
        pV[i] += offsetV[i];
        if(pV[i] == gs || pV[i] == -1) return true;
    }
    return false;
}

function evaluateMove(data: number[], pos: number, player: number): number {
    let priority: number = 5;

    for(let i = 0; i<offsets.length; i++) {
        
        function value(p: number): number {
            return data[pos+p*offsets[i]]
        }
        
        let l = [-5, 5];
        let _l = [0, 0];
        let opp = player == 1 ? 2 : 1;
        let count = -1;

        for(let j = 0; j<2; j++) {
            let dir = j*2-1;
            for(let k = 0; Math.abs(k)<5; k+=dir) {
                let e: Boolean = false;
                switch(value(k)) {
                    case opp:
                        e = true;
                        break;
                    case 0:
                        if(_l[j] == 0) _l[j] = k;
                        break;
                    case player:
                        if(_l[j] == 0) count++;
                        break;
                }
    
                if(e || isCorner(pos+k*offsets[i], offsetsV[i*2+j])) {
                    l[j] = k+(+!e)*dir;
                    break;
                };
    
            }

            if(_l[j] == 0) _l[j] = l[j];
        }
             
        function getPriority(p: number, r: number, d:number, c: number, s: number): number {

            for(; Math.abs(p)<Math.abs(l[+(d>0)]) && value(p) == 0; p+=d) {
                c--;
                s++;
                if(c==0) return s; 
            }
            for(; Math.abs(p)<Math.abs(l[+(d>0)]) && value(p) == player; p+=d) {
                c--;
                if(c==0) return s;
            }
            if(p==l[+(d>0)] && r==l[+!(d>0)]) return s;
            if(p==l[+(d>0)]) return getPriority(r, p, -d, c, s);
            if(r==l[+!(d>0)]) return getPriority(p, r, d, c, s);
            return Math.min(getPriority(p, r, d, c, s), getPriority(r, p, -d, c, s));
        }

        if(count >= 5) return 0;
        if(l[1]-l[0] > 5) priority = Math.min(Math.min(getPriority(_l[0], _l[1], -1, 5-count, 0), getPriority(_l[1], _l[0], 1, 5-count, 0)), priority);
    }

    return priority;
}