import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneActions } from '@/app/store/actions';
import { tap, withLatestFrom, filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { SceneSelectors } from '../selectors';
import { Point } from '@/lib/models';

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
                    select(SceneSelectors.selectHoveredInteractiveEntryId)
                ),
            ),
            filter(([,pressed]) => pressed),
            tap(([action,, origin, entryId]) => {
                if (entryId === null) {
                    this.store$.dispatch(
                        SceneActions.setMeshOrigin({
                            origin: new Point(origin.x + action.diff.x, origin.y + action.diff.y)
                        })
                    );
                } else {
                    console.log(entryId);
                }
            })
        ), { dispatch: false },
    );
}

