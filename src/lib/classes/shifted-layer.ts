import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class ShiftedLayer implements Drawable {

    constructor(
        private readonly origin: Point,
        private readonly entry: Drawable,
    ) { }

    draw(ctx: DrawingContext): void {
        ctx.origin(this.origin);
        this.entry.draw(ctx);
        ctx.origin({x: -this.origin.x, y: -this.origin.y});
    }
}
