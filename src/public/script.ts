const canvas: HTMLCanvasElement = document.querySelector("canvas");
var mp: number;

const drawer: PisqworkyDrawer = new PisqworkyDrawer(canvas.getContext('2d'), mp, 16, 0.5);
let game: Game = new Game();

const GRID_SIZE: number = 16;


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

    const p = x + y*GRID_SIZE;

    if(!game.isValid(p)) return;
    
    if(game.turn) {
        drawer.circle(x, y);
    }else {
        drawer.cross(x, y);
    }
    game.play(p);
}

canvas.onclick = mouseClicked;
window.onresize = windowResized;
windowResized();



