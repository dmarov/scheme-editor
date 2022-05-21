import { Point } from '../models';

export interface DrawingContext {
    line(start: Point, end: Point): DrawingContext;
    color(color: string): DrawingContext;
    width(width: number): DrawingContext;
}
