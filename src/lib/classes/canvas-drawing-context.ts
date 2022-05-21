import { Point } from '../models';
import { DrawingContext } from '../interfaces';

export class CanvasDrawingContext implements DrawingContext {

    constructor(
        private readonly ctx: CanvasRenderingContext2D,
    ) { }

    line(start: Point, end: Point) {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
    }
}
