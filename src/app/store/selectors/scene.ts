import { Collection } from '@/lib/classes';
import { Mesh } from '@/lib/classes/mesh';
import { Drawable } from '@/lib/interfaces';
import { Point } from '@/lib/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureKey } from '../reducers/scene';

export const selectState = createFeatureSelector<State>(
    featureKey
);

export const selectRenderingModel = createSelector(
    selectState, (state): Drawable => {

        const mesh = new Mesh(
            state.meshOrigin,
            state.viewportDimensions,
            state.meshGap,
            '#000000',
            '#616161',
            '#c4c2c2',
        );

        return new Collection([mesh])

    }
);

export const selectViewportDimensions = createSelector(
    selectState, (state): Point => {
        return state.viewportDimensions;
    }
);
