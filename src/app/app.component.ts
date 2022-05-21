import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasDrawingContext, DrawingContext } from '@/lib';
import { select, Store } from '@ngrx/store';
import { SceneActions } from '@/app/store/actions';
import { Point } from '@/app/models';
import { SceneSelectors } from './store/selectors';
import { SceneReducers } from './store/reducers';

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
        private readonly store$: Store,
    ) { }

    ngAfterViewInit(): void {
        const scene = this.scene!.nativeElement;
        const ctx = scene.getContext('2d');
        this.drawingCtx = new CanvasDrawingContext(ctx!);

        scene.addEventListener('mousemove', (e) => {
            const position = new Point(e.clientX, e.clientY);
            this.store$.dispatch(
                SceneActions.setCursorPosition({ position })
            );
        });

        this.hookCanvasResizeEvent();

        this.store$.pipe(
            select(SceneSelectors.selectState)
        ).subscribe((state) => {
            this.drawScene(state);
        });
    }

    hookCanvasResizeEvent(): void {
        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                this.setSceneSize(entry.contentRect.width, entry.contentRect.height);
            });
        });

        observer.observe(this.hostRef.nativeElement);
        this.setSceneSize(this.scene!.nativeElement.clientWidth, this.scene!.nativeElement.clientHeight);
    }

    setSceneSize(width: number, height: number): void {
        const dimensions = { x: Math.floor(width), y: Math.floor(height) };
        this.store$.dispatch(
            SceneActions.setViewportDimensions({ dimensions })
        );
    }

    drawScene(state: SceneReducers.State) {
        const centerX = state.viewportDimensions.x / 2;
        const centerY = state.viewportDimensions.y / 2;

        this.drawingCtx!
            .dimensions(state.viewportDimensions)
            .color("#000000")
            .width(1)
            .line({x: centerX, y: 0}, {x: centerX, y: state.viewportDimensions.y})
            .line({x: 0, y: centerY}, {x: state.viewportDimensions.x, y: centerY});
    }
}
