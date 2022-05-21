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
        const horCnt = Math.ceil(this.viewportDimensions.y / this.meshGap / 2) + 1;
        const vertCnt = Math.ceil(this.viewportDimensions.x / this.meshGap / 2) + 1;

        // this.drawExtraLines(ctx, horCnt, vertCnt);
        // this.drawSecondaryLines(ctx, horCnt, vertCnt);
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
        ctx.width(2)
            .color(this.primaryColor)
            .line({
                x: this.viewportCenter.x + this.viewportDimensions.x / 2,
                y: 0
            }, {
                x: this.viewportCenter.x + this.viewportDimensions.x / 2,
                y: this.viewportDimensions.y,
            }).line({
                x: 0,
                y: this.viewportCenter.y + this.viewportDimensions.y / 2,
            }, {
                x: this.viewportDimensions.x,
                y: this.viewportCenter.y + this.viewportDimensions.y / 2,
            });
    }

    private drawVerticalLines(ctx: DrawingContext, color: string, vertCnt: number, density: number) {
        const centerX = this.viewportCenter.x;
        const length = Math.ceil(vertCnt / density);
        for (let i = -length; i < length; i++) {
            ctx.color(color)
                .line({
                    x: this.viewportCenter.x + centerX + i * this.meshGap * density,
                    y: this.viewportCenter.y - this.viewportDimensions.y / 2
                }, {
                    x: this.viewportCenter.x + centerX + i * this.meshGap * density,
                    y: this.viewportCenter.y + this.viewportDimensions.y / 2
                });
        }
    }

    private drawHorizontalLines(ctx: DrawingContext, color: string, horCnt: number, density: number) {
        const centerY = this.viewportCenter.y;
        const length = Math.ceil(horCnt / density);

        for (let i = -length; i < length; i++) {
            ctx.color(color)
                .line({
                    x: this.viewportCenter.x - this.viewportDimensions.x / 2,
                    y: this.viewportCenter.y + centerY + i * this.meshGap * density
                }, {
                    x: this.viewportCenter.x + this.viewportDimensions.x / 2,
                    y: this.viewportCenter.y + centerY + i * this.meshGap * density
                });
        }
    }
}
