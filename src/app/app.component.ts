import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('canvas')
    scene: ElementRef<HTMLCanvasElement> | null = null;

    ngAfterViewInit(): void {
        this.watchResize();
    }

    watchResize(): void {
        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                this.setSceneSize(entry.contentRect.width, entry.contentRect.height)
            });
        });

        observer.observe(this.scene!.nativeElement);

        this.setSceneSize(this.scene!.nativeElement.clientWidth, this.scene!.nativeElement.clientHeight);
    }

    setSceneSize(width: number, height: number): void {
        const scene = this.scene!.nativeElement;
        const ctx = scene.getContext("2d");
        ctx!.canvas.width = Math.ceil(width);
        ctx!.canvas.height = Math.ceil(height);
    }
}
