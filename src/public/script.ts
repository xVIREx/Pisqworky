const canvas: HTMLCanvasElement = document.querySelector("canvas");
var mp: number;

const GRID_SIZE: number = 16;

const drawer: PisqworkyDrawer = new PisqworkyDrawer(canvas.getContext('2d'), mp, GRID_SIZE, 0.5);
let game: Game = new Game();

let canPlay = true;

function windowResized() {
    mp = (Math.min(window.innerHeight, window.innerWidth)*0.8) / GRID_SIZE; /* should cover 80% of page */
    canvas.width = mp * GRID_SIZE;
    canvas.height = mp * GRID_SIZE;

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
    const p = x + y*GRID_SIZE;

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
    const p: number = getBestMove(game.data);

    drawer.circle(p%GRID_SIZE, Math.floor(p/GRID_SIZE));
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



