import { Point } from '../models';
import { DrawingContext } from '../interfaces';

export class CanvasDrawingContext implements DrawingContext {

    constructor(
        private readonly ctx: CanvasRenderingContext2D,
    ) { }

    color(color: string): DrawingContext {
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        return this;
    }

    width(width: number): DrawingContext {
        this.ctx.lineWidth = width;
        return this;
    }

    line(start: Point, end: Point): DrawingContext {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        return this;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        return this;
    }

    dimensions(dimensions: Point) {
        this.ctx.canvas.width = dimensions.x;
        this.ctx.canvas.height = dimensions.y;
        return this;
    }

    rect(origin: Point, width: number, height: number) {
        this.ctx.fillRect(origin.x, origin.y, width, height);
        return this;
    }
}
