import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class Mesh implements Drawable {
    constructor(
        private readonly viewportCenter: Point,
        private readonly viewportDimensions: Point,
        private readonly meshGap: number,
    ) { }

    draw(ctx: DrawingContext): void {
        ctx.color("#000000")
            .width(1)
            .line({x: this.viewportCenter.x, y: 0}, {x: this.viewportCenter.x, y: this.viewportDimensions.y})
            .line({x: 0, y: this.viewportCenter.y}, {x: this.viewportDimensions.x, y: this.viewportCenter.y});
    }
}
