import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class Mesh implements Drawable {

    constructor(
        private readonly viewportCenter: Point,
        private readonly viewportDimensions: Point,
        private readonly meshGap: number,
        private readonly primaryColor: string,
        private readonly secondaryColor: string,
        private readonly extraColor: string,
    ) { }

    draw(ctx: DrawingContext): void {
        ctx.width(1);
        this.drawVerticalLines(ctx);
        this.drawHorizontalLines(ctx);
    }

    private drawVerticalLines(ctx: DrawingContext) {
        const horCnt = Math.floor(this.viewportDimensions.x / this.meshGap / 2) + 1;
        const centerX = this.viewportCenter.x;
        for (let i = -horCnt; i < horCnt; i++) {
            ctx.color(this.getColorForIndex(i))
                .line({
                    x: centerX + i * this.meshGap,
                    y: 0
                }, {
                    x: centerX + i * this.meshGap,
                    y: this.viewportDimensions.y
                });
        }
    }

    private drawHorizontalLines(ctx: DrawingContext) {
        const vertCnt = Math.floor(this.viewportDimensions.y / this.meshGap / 2) + 1;
        const centerY = this.viewportCenter.y;

        for (let i = -vertCnt; i < vertCnt; i++) {
            ctx.color(this.getColorForIndex(i))
                .line({
                    x: 0, y: centerY + i * this.meshGap
                }, {
                    x: this.viewportDimensions.x,
                    y: centerY + i * this.meshGap
                });
        }
    }

    private getColorForIndex(i: number) {

        if (i === 0) {
            return this.primaryColor;
        }

        if ((i % 5) === 0) {
            return this.secondaryColor;
        }

        return this.extraColor;
    }
}
