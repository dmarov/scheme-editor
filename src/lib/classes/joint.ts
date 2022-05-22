import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class Joint implements Drawable {

    constructor(
        private readonly origin: Point,
        private readonly radius: number,
        private readonly color: string,
    ) { }

    draw(ctx: DrawingContext): void {
        ctx.color(this.color)
            .circle(this.origin, this.radius);
    }
}
