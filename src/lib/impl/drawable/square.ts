import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "../../models/point";

export class Square implements Drawable {

    constructor(
        private readonly origin: Point,
        private readonly size: number,
        private readonly color: string,
        private readonly borderColor: string,
    ) { }

    draw(ctx: DrawingContext): void {
        const prevWidth = ctx.getWidth();

        const p1 = new Point(this.origin.x, this.origin.y + this.size);
        const p2 = new Point(this.origin.x + this.size, this.origin.y + this.size);
        const p3 = new Point(this.origin.x + this.size, this.origin.y);

        ctx.width(1)
            .color(this.color)
            .rect(this.origin, this.size, this.size)
            .color(this.borderColor)
            .width(2)
            .line(this.origin, p1)
            .line(p1, p2)
            .line(p2, p3)
            .line(p3, this.origin)

        ctx.width(prevWidth);
    }
}
