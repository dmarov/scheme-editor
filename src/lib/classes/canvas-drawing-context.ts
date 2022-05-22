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
        this.ctx.scale(1, 1);
        return this;
    }

    dimensions(dimensions: Point) {
        this.ctx.canvas.width = dimensions.x;
        this.ctx.canvas.height = dimensions.y;
        return this;
    }

    rect(origin: Point, width: number, height: number) {
        this.ctx.fillRect(origin.x, origin.y, width, height)
        return this;
    }

    origin(origin: Point) {
        this.ctx.translate(origin.x, origin.y);
        return this;
    }

    scale(factor: number) {
        this.ctx.scale(factor, factor);
        return this;
    }

    circle(center: Point, radius: number) {
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        return this;
    }

    getWidth() {
        return this.ctx.lineWidth;
    }
}
