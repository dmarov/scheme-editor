import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class ScaledLayer implements Drawable {

    constructor(
        private readonly scaleFactor: number,
        private readonly entry: Drawable,
    ) { }

    draw(ctx: DrawingContext): void {
        // const prevScale = ctx.getScale();
        ctx.scale(this.scaleFactor);
        this.entry.draw(ctx);
        ctx.scale(1);
        // ctx.scale(prevScale);
    }
}
