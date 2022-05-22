import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasDrawingContext, DrawingContext } from '@/lib';
import { select, Store } from '@ngrx/store';
import { SceneActions } from '@/app/store/actions';
import { Point } from '@/app/models';
import { SceneSelectors } from './store/selectors';
import { Drawable } from '@/lib/interfaces';
import { filter, fromEvent, tap, withLatestFrom } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('canvas')
    scene: ElementRef<HTMLCanvasElement> | null = null;

    drawingCtx: DrawingContext | null = null;

    latestPosition: Point | null = null;

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
            if (this.latestPosition === null) {
                this.latestPosition = new Point(e.clientX, e.clientY);
                return;
            }

            const position = new Point(e.clientX, e.clientY);
            this.store$.dispatch(
                SceneActions.setCursorPosition({ position })
            );

            this.store$.dispatch(
                SceneActions.tryMove({
                    diff: {
                        x: e.clientX - this.latestPosition.x,
                        y: e.clientY - this.latestPosition.y,
                    }
                })
            );

            this.latestPosition = new Point(e.clientX, e.clientY);
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

        fromEvent<WheelEvent>(scene, 'wheel').pipe(
            withLatestFrom(
                this.store$.pipe(select(SceneSelectors.selectCtrlPressed)),
                this.store$.pipe(select(SceneSelectors.selectScaleFactor)),
            ),
            tap(([e]) => {
                e.preventDefault();
            }),
            filter(([, pressed]) => pressed),
        ).subscribe(([e,,factor]) => {
            this.store$.dispatch(
                SceneActions.setScaleFactor({ factor: factor + e.deltaY * 0.001 })
            );
        });

        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            this.store$.dispatch(
                SceneActions.addPressedKey({code: e.code})
            );
        });

        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            this.store$.dispatch(
                SceneActions.removePressedKey({code: e.code})
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
