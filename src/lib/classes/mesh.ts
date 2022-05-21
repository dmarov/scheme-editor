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
        const horCnt = Math.floor(this.viewportDimensions.x / this.meshGap / 2) + 1;
        const vertCnt = Math.floor(this.viewportDimensions.y / this.meshGap / 2) + 1;

        this.drawExtraLines(ctx, horCnt, vertCnt);
        this.drawSecondaryLines(ctx, horCnt, vertCnt);
        this.drawPrimaryLines(ctx);
    }

    private drawExtraLines(ctx: DrawingContext, horCnt: number, vertCnt: number) {
        this.drawHorizontalLines(ctx, this.extraColor, horCnt, 1);
        this.drawVerticalLines(ctx, this.extraColor, vertCnt, 1);
    }

    private drawSecondaryLines(ctx: DrawingContext, horCnt: number, vertCnt: number) {
        this.drawHorizontalLines(ctx, this.secondaryColor, horCnt, 5);
        this.drawVerticalLines(ctx, this.secondaryColor, vertCnt, 5);
    }

    private drawPrimaryLines(ctx: DrawingContext) {
        ctx.color(this.primaryColor)
            .line({
                x: this.viewportDimensions.x / 2,
                y: 0
            }, {
                x: this.viewportDimensions.x / 2,
                y: this.viewportDimensions.y,
            }).line({
                x: 0,
                y: this.viewportDimensions.y / 2,
            }, {
                x: this.viewportDimensions.x,
                y: this.viewportDimensions.y / 2,
            });
    }

    private drawVerticalLines(ctx: DrawingContext, color: string, vertCnt: number, density: number) {
        const centerX = this.viewportCenter.x;
        const length = vertCnt / density;
        for (let i = -length; i < length; i++) {
            ctx.color(color)
                .line({
                    x: centerX + i * this.meshGap * density,
                    y: 0
                }, {
                    x: centerX + i * this.meshGap * density,
                    y: this.viewportDimensions.y
                });
        }
    }

    private drawHorizontalLines(ctx: DrawingContext, color: string, horCnt: number, density: number) {
        const centerY = this.viewportCenter.y;
        const length = horCnt / density;

        for (let i = -length; i < length; i++) {
            ctx.color(color)
                .line({
                    x: 0,
                    y: centerY + i * this.meshGap * density
                }, {
                    x: this.viewportDimensions.x,
                    y: centerY + i * this.meshGap * density
                });
        }
    }
}
