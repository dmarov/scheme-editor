import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class Connection implements Drawable {

    constructor(
        private readonly fromPoint: Point,
        private readonly toPoint: Point,
    ) { }

    draw(ctx: DrawingContext): void {
        const prevWidth = ctx.getWidth();

        ctx.width(1)
            .line(this.fromPoint, this.toPoint);

        ctx.width(prevWidth);
    }
}
