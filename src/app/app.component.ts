import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasDrawingContext, DrawingContext } from '@/lib';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('canvas')
    scene: ElementRef<HTMLCanvasElement> | null = null;

    drawingCtx: DrawingContext | null = null;

    constructor(
        private readonly hostRef: ElementRef,
    ) { }

    ngAfterViewInit(): void {
        const scene = this.scene!.nativeElement;
        const ctx = scene.getContext('2d');
        this.drawingCtx = new CanvasDrawingContext(ctx!);
        this.watchResize();
    }

    watchResize(): void {
        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                this.setSceneSize(entry.contentRect.width, entry.contentRect.height);
            });
        });

        observer.observe(this.hostRef.nativeElement);

        this.setSceneSize(this.hostRef.nativeElement.clientWidth, this.hostRef.nativeElement.clientHeight);
        this.drawScene();
    }

    setSceneSize(width: number, height: number): void {
        const scene = this.scene!.nativeElement;
        const ctx = scene.getContext('2d');
        ctx!.canvas.width = Math.floor(width);
        ctx!.canvas.height = Math.floor(height);
        this.drawScene();
    }

    drawScene() {
        this.drawingCtx!
            .color("#000000")
            .width(14)
            .line({x: 100, y: 100}, {x: 500, y: 500});
    }
}
