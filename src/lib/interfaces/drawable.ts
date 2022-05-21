import { DrawingContext } from '.';

export interface Drawable {
    draw(ctx: DrawingContext): void;
}
