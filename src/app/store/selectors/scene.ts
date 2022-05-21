import { createFeatureSelector } from '@ngrx/store';
import { State, featureKey } from '../reducers/scene';

export const selectState = createFeatureSelector<State>(
    featureKey
);
