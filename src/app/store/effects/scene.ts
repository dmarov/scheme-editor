import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SceneActions } from '@/app/store/actions';
import { map, mergeMap, catchError, tap, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {SceneSelectors} from '../selectors';
import {Point} from '@/lib/models';

@Injectable()
export class SceneEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly store$: Store,
    ) { }

    shiftLayer$ = createEffect(
        () => this.actions$.pipe(
            ofType(SceneActions.setCursorPosition),
            withLatestFrom(
                this.store$.pipe(
                    select(SceneSelectors.selectMouseLeftPressed)
                ),
                this.store$.pipe(
                    select(SceneSelectors.selectCursorPosition)
                ),
                this.store$.pipe(
                    select(SceneSelectors.selectMeshOrigin)
                ),
            ),
            filter(([,pressed]) => pressed),
            tap(([action,, position, origin]) => {
                const dx = action.position.x - position.x;
                const dy = action.position.y - position.y;

                this.store$.dispatch(
                    SceneActions.setMeshOrigin({
                        origin: new Point(origin.x + dx, origin.y + dy)
                    })
                )
            })
        ), { dispatch: false },
    );
}

