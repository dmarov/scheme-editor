import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('canvas')
    scene: ElementRef<HTMLCanvasElement> | null = null;

    constructor(
        private readonly hostRef: ElementRef,
    ) { }

    ngAfterViewInit(): void {
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
    }

    setSceneSize(width: number, height: number): void {
        const scene = this.scene!.nativeElement;
        const ctx = scene.getContext('2d');
        ctx!.canvas.width = Math.ceil(width);
        ctx!.canvas.height = Math.ceil(height);
    }
}
