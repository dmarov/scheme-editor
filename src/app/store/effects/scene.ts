import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneActions } from '@/app/store/actions';
import { tap, withLatestFrom, filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { SceneSelectors } from '../selectors';
import { Point } from '@/lib';

@Injectable()
export class SceneEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store,
    ) { }

    shiftLayer$ = createEffect(
        () => this.actions$.pipe(
            ofType(SceneActions.tryMove),
            withLatestFrom(
                this.store$.pipe(
                    select(SceneSelectors.selectMouseLeftPressed)
                ),
                this.store$.pipe(
                    select(SceneSelectors.selectMeshOrigin)
                ),
                this.store$.pipe(
                    select(SceneSelectors.selectActiveEntryId)
                ),
                this.store$.pipe(
                    select(SceneSelectors.selectActiveEntry)
                ),
            ),
            filter(([,pressed]) => pressed),
            tap(([action,, origin, id, entry]) => {
                if (id === null) {
                    this.store$.dispatch(
                        SceneActions.setMeshOrigin({
                            origin: new Point(origin.x + action.diff.x, origin.y + action.diff.y)
                        })
                    );
                } else {
                    this.store$.dispatch(
                        SceneActions.setEntryOrigin({
                            id,
                            origin: new Point(entry.origin.x + action.diff.x, entry.origin.y + action.diff.y)
                        })
                    );
                }
            })
        ), { dispatch: false },
    );

    setActiveObject$ = createEffect(
        () => this.actions$.pipe(
            ofType(SceneActions.setMouseLeftPressed),
            filter(action => action.pressed),
            withLatestFrom(
                this.store$.pipe(
                    select(SceneSelectors.selectHoveredInteractiveEntryId)
                ),
            ),
            tap(([, id]) => {
                this.store$.dispatch(
                    SceneActions.setActiveEntry({id})
                );
            })
        ), { dispatch: false },
    );

    unsetActiveObject$ = createEffect(
        () => this.actions$.pipe(
            ofType(SceneActions.setMouseLeftPressed),
            filter(action => !action.pressed),
            tap(() => {
                this.store$.dispatch(
                    SceneActions.setActiveEntry({id: null})
                );
            })
        ), { dispatch: false },
    );
}

