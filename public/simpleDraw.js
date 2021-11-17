"use strict";
class Drawer {
    constructor(ctx, mp, size) {
        this.bgColor = "white";
        this.circleDS = {
            lineWidth: 8,
            strokeStyle: "blue",
            fillStyle: "white"
        };
        this.lineDS = {
            lineWidth: 1,
            strokeStyle: "black",
            fillStyle: "black"
        };
        this.ctx = ctx;
        this.mp = mp;
        this.size = size;
    }
    get _size() {
        return this.mp * this.size;
    }
    background() {
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this._size, this._size);
    }
    circle(x, y, r, customDS) {
        this.applyStyle(customDS || this.circleDS);
        this.ctx.beginPath();
        this.ctx.arc(mp * (x + 0.5), mp * (y + 0.5), mp * r * 0.5, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    line(x0, y0, x1, y1, customDS) {
        this.applyStyle(customDS || this.lineDS);
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
    }
    grid(gridSize) {
        for (let i = 0; i < gridSize + 1; i++) {
            this.line(i * this.mp, 0, i * this.mp, this._size);
        }
        for (let i = 0; i < gridSize + 1; i++) {
            this.line(0, i * this.mp, this._size, i * this.mp);
        }
    }
    applyStyle(drawStyle) {
        this.ctx.lineWidth = drawStyle.lineWidth;
        this.ctx.strokeStyle = drawStyle.strokeStyle;
        this.ctx.fillStyle = drawStyle.fillStyle;
    }
}
class PisqworkyDrawer extends Drawer {
    constructor() {
        super(...arguments);
        this.crossDS = {
            lineWidth: 8,
            strokeStyle: "red",
            fillStyle: "red"
        };
    }
    grid_reconstruct(data) {
        super.grid(this.size);
    }
    cross(x, y, r, customDS) {
        x = mp * (x + 1 / 2);
        y = mp * (y + 1 / 2);
        r *= 0.5 * this.mp;
        this.line(x - r, y - r, x + r, y + r, customDS || this.crossDS);
        this.line(x + r, y - r, x - r, y + r, customDS || this.crossDS);
    }
}
