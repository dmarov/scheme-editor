import { Point } from '..';

export interface DrawingContext {
    line(start: Point, end: Point): DrawingContext;
    color(color: string): DrawingContext;
    width(width: number): DrawingContext;
    clear(): DrawingContext;
    dimensions(dimensions: Point): DrawingContext;
    rect(origin: Point, width: number, height: number): DrawingContext;
    circle(center: Point, radius: number): DrawingContext;
    origin(origin: Point): DrawingContext;
    scale(factor: number): DrawingContext;
    getWidth(): number;
}
