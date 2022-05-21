import { Drawable, DrawingContext } from "@/lib/interfaces";

export class Collection implements Drawable {

    constructor(
        private readonly entries: Drawable[],
    ) { }

    draw(ctx: DrawingContext): void {
        for (const entry of this.entries) {
            entry.draw(ctx);
        }
    }
}
