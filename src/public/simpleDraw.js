"use strict";
class Drawer {
    constructor(ctx) {
        this.bgColor = "white";
        this.circleDS = {
            lineWidth: 2,
            strokeStyle: "black",
            fillStyle: "white"
        };
        this.ctx = ctx;
    }
    circle(x, y, r, mp, customDS) {
        const _style = customDS || this.circleDS;
        this.ctx.lineWidth = _style.lineWidth;
        this.ctx.strokeStyle = _style.strokeStyle;
        this.ctx.fillStyle = _style.fillStyle;
        this.ctx.beginPath();
        this.ctx.arc(mp * (x + 1 / 2), mp * (y + 1 / 2), mp * r, 0, Math.PI);
        this.ctx.stroke();
    }
    grid(grid_size, mp) {
    }
}
