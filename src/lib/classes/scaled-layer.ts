import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class ScaledLayer implements Drawable {

    constructor(
        private readonly origin: Point,
        private readonly scaleFactor: number,
        private readonly entry: Drawable,
    ) { }

    draw(ctx: DrawingContext): void {
        ctx.origin(this.origin);
        ctx.scale(this.scaleFactor);
        this.entry.draw(ctx);
        ctx.scale(1 / this.scaleFactor);
        ctx.origin({x: -this.origin.x, y: -this.origin.y});
    }
}
