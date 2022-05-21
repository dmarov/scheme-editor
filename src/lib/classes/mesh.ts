import { Drawable, DrawingContext } from "@/lib/interfaces";
import { Point } from "@/lib/models";

export class Mesh implements Drawable {

    constructor(
        private readonly meshOrigin: Point,
        private readonly viewportDimensions: Point,
        private readonly meshGap: number,
        private readonly primaryColor: string,
        private readonly secondaryColor: string,
        private readonly extraColor: string,
    ) { }

    draw(ctx: DrawingContext): void {
        ctx.width(1);
        const horCnt = Math.ceil(this.viewportDimensions.y / this.meshGap) + 1;
        const vertCnt = Math.ceil(this.viewportDimensions.x / this.meshGap) + 1;

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
        ctx.width(2)
            .color(this.primaryColor)
            .line({
                x: this.meshOrigin.x,
                y: 0
            }, {
                x: this.meshOrigin.x,
                y: this.viewportDimensions.y,
            }).line({
                x: 0,
                y: this.meshOrigin.y,
            }, {
                x: this.viewportDimensions.x,
                y: this.meshOrigin.y,
            });
    }

    private drawVerticalLines(ctx: DrawingContext, color: string, vertCnt: number, density: number) {
        const count = Math.ceil(vertCnt / density);
        const offsetX = Math.ceil(this.meshOrigin.x / this.meshGap / density);

        for (let i = 0; i < count ; i++) {
            ctx.color(color)
                .line({
                    x: this.meshOrigin.x + (i - offsetX) * this.meshGap * density,
                    y: 0
                }, {
                    x: this.meshOrigin.x + (i - offsetX) * this.meshGap * density,
                    y: this.viewportDimensions.y,
                });
        }
    }

    private drawHorizontalLines(ctx: DrawingContext, color: string, horCnt: number, density: number) {
        const length = Math.ceil(horCnt / density);
        const offsetY = Math.ceil(this.meshOrigin.y / this.meshGap / density);

        for (let i = 0; i < length; i++) {
            ctx.color(color)
                .line({
                    x: 0,
                    y: this.meshOrigin.y + (i - offsetY) * this.meshGap * density,
                }, {
                    x: this.viewportDimensions.x,
                    y: this.meshOrigin.y + (i - offsetY) * this.meshGap * density,
                });
        }
    }
}
