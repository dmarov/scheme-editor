import { Mesh } from '@/lib/classes/mesh';
import { Drawable } from '@/lib/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureKey } from '../reducers/scene';

export const selectState = createFeatureSelector<State>(
    featureKey
);

export const selectrenderingModel = createSelector(
    selectState, (state): Drawable => {
        return new Mesh(state.viewportCenter, state.viewportDimensions, state.meshGap);
    }
);
