const canvas: HTMLCanvasElement = document.querySelector("canvas");
var mp: number;

const drawer: PisqworkyDrawer = new PisqworkyDrawer(canvas.getContext('2d'), mp, gs, 0.5);
let game: Game = new Game();

let canPlay = true;

function windowResized() {
    mp = (Math.min(window.innerHeight, window.innerWidth)*0.8) / gs; /* should cover 80% of page */
    canvas.width = mp * gs;
    canvas.height = mp * gs;

    drawer.mp = mp;    
    drawer.background();
    drawer.gridReconstruct(game.data);
}

function mouseClicked(e: MouseEvent) {
    const offset = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX-offset.left) / mp);
    const y = Math.floor((e.clientY-offset.top) / mp);

    playerMove(x, y);
}

function playerMove(x: number, y: number) {
    const p = x + y*gs;

    if(!game.isValid(p) || !canPlay) return;
    
    drawer.cross(x, y);    
    game.play(p);

    if(game.checkWin(p)) {
        win();
        canPlay = false;
    }
    else aiMove();
    
}

function aiMove() {
    const p: number = getBestMove(0, new SimulatedBoard(game.data), false);

    drawer.circle(p%gs, Math.floor(p/gs));
    game.play(p);

    if(game.checkWin(p)) {
        lose();
        canPlay = false;
    }
}

function win() {
    console.log("WIN");
}

function lose() {
    console.log("LOSE");
}

canvas.onclick = mouseClicked;
window.onresize = windowResized;
windowResized();



