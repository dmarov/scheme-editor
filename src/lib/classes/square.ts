import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class Square implements Drawable {

    constructor(
        private readonly meshOrigin: Point,
        private readonly origin: Point,
        private readonly size: number,
        private readonly color: string,
    ) { }

    draw(ctx: DrawingContext): void {
        const o = new Point(this.meshOrigin.x + this.origin.x, this.meshOrigin.y + this.origin.y);
        ctx.width(1)
            .color(this.color)
            .rect(o, this.size, this.size);
    }
}
