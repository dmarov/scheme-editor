import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasDrawingContext, DrawingContext } from '@/lib';
import { select, Store } from '@ngrx/store';
import { SceneActions } from '@/app/store/actions';
import { Point } from '@/app/models';
import { SceneSelectors } from './store/selectors';
import { Drawable } from '@/lib/interfaces';
import { withLatestFrom } from 'rxjs';

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
        this.hookUserEvents();

        this.store$.pipe(
            select(SceneSelectors.selectRenderingModel)
        ).subscribe((model) => {
            this.drawScene(model);
        });

        this.store$.pipe(
            select(SceneSelectors.selectViewportDimensions),
            withLatestFrom(this.store$.pipe(select(SceneSelectors.selectRenderingModel))),
        ).subscribe(([dimensions, model]) => {
            this.drawingCtx!.dimensions(dimensions);
            model.draw(this.drawingCtx!);
        });

        this.setSceneSize(this.scene!.nativeElement.clientWidth, this.scene!.nativeElement.clientHeight);
    }

    hookUserEvents(): void {
        const scene = this.scene!.nativeElement;
        const ctx = scene.getContext('2d');
        this.drawingCtx = new CanvasDrawingContext(ctx!);

        scene.addEventListener('mousemove', (e) => {
            const position = new Point(e.clientX, e.clientY);
            this.store$.dispatch(
                SceneActions.setCursorPosition({ position })
            );
        });

        scene.addEventListener('mouseenter', (e) => {
            this.store$.dispatch(
                SceneActions.setMouseEntered({ entered: true })
            );
        });

        scene.addEventListener('mouseleave', (e) => {
            this.store$.dispatch(
                SceneActions.setMouseEntered({ entered: false })
            );
        });

        scene.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this.store$.dispatch(
                    SceneActions.setMouseLeftPressed({ pressed: true })
                );
            }
        });

        scene.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.store$.dispatch(
                    SceneActions.setMouseLeftPressed({ pressed: false })
                );
            }
        });

        scene.addEventListener('wheel', (e) => {
            e.preventDefault();

            this.store$.dispatch(
                SceneActions.addScaleFactor({ factor: e.deltaY * -0.01 })
            );
        });

        this.hookResizeEvent();
    }

    hookResizeEvent(): void {
        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                this.setSceneSize(entry.contentRect.width, entry.contentRect.height);
            });
        });

        observer.observe(this.hostRef.nativeElement);
    }

    setSceneSize(width: number, height: number): void {
        const dimensions = { x: Math.floor(width), y: Math.floor(height) };
        this.store$.dispatch(
            SceneActions.setViewportDimensions({ dimensions })
        );
    }

    drawScene(model: Drawable): void {
        this.drawingCtx!.clear();
        model.draw(this.drawingCtx!);
    }
}
