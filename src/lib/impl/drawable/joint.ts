import { Point, Drawable, DrawingContext } from "../..";

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
