import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class Mesh implements Drawable {
    constructor(
        private readonly viewportCenter: Point,
        private readonly viewportDimensions: Point,
        private readonly meshGap: number,
    ) { }

    draw(ctx: DrawingContext): void {
        const horCnt = Math.floor(this.viewportDimensions.x / this.meshGap / 2) + 1;
        const vertCnt = Math.floor(this.viewportDimensions.y / this.meshGap / 2) + 1;
        const centerX = this.viewportCenter.x;
        const centerY = this.viewportCenter.y;

        for (let i = -horCnt; i < horCnt; i++) {
            ctx.color("#000000")
                .width(1)
                .line({x: centerX + i * this.meshGap, y: 0}, {x: centerX + i * this.meshGap, y: this.viewportDimensions.y});
        }

        for (let i = -vertCnt; i < vertCnt; i++) {
            ctx.color("#000000")
                .width(1)
                .line({x: this.viewportCenter.x, y: 0}, {x: this.viewportCenter.x, y: this.viewportDimensions.y})
                .line({x: 0, y: centerY + i * this.meshGap}, {x: this.viewportDimensions.x, y: centerY + i * this.meshGap});
        }
    }
}
