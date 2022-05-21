import { Point } from '../models';

export interface DrawingContext {

    line(start: Point, end: Point): void;

}
