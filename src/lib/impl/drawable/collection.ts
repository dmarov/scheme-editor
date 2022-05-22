import { Drawable, DrawingContext, Point } from "../..";

export class Collection implements Drawable {

    constructor(
        private readonly origin: Point,
        private readonly entries: Drawable[],
    ) { }

    draw(ctx: DrawingContext): void {
        ctx.origin(this.origin);

        for (const entry of this.entries) {
            entry.draw(ctx);
        }

        ctx.origin({x: -this.origin.x, y: -this.origin.y});
    }
}
