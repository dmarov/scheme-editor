import { Point } from '../models';
import { DrawingContext } from '../interfaces';

export class CanvasDrawingContext implements DrawingContext {

    private originPoint = new Point(0, 0);

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
        this.ctx.moveTo(this.originPoint.x + start.x, this.originPoint.y + start.y);
        this.ctx.lineTo(this.originPoint.x + end.x, this.originPoint.y + end.y);
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
        this.ctx.fillRect(this.originPoint.x + origin.x, this.originPoint.y + origin.y, width, height);
        return this;
    }

    origin(origin: Point) {
        this.originPoint = origin;
        return this;
    }

    scale(factor: number) {
        this.ctx.scale(factor, factor);
        return this;
    }

    getOrigin() {
        return this.originPoint;
    }

    getWidth() {
        return this.ctx.lineWidth;
    }
}
