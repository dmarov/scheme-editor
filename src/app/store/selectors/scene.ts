import { Collection, ScaledLayer, ShiftedLayer, Square } from '@/lib/classes';
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
            state.primaryColor,
            state.secondaryColor,
            state.extraColor,
        );

        const sq1 = new Square(new Point(50, 50), 100, state.extraColor, state.secondaryColor);
        const sq2 = new Square(new Point(150, -150), 100, state.extraColor, state.secondaryColor);
        const sqs = new Collection([sq1, sq2]);

        const shl = new ShiftedLayer(state.meshOrigin, sqs);
        const scl = new ScaledLayer({
            x: state.meshOrigin.x - state.viewportDimensions.x / 2,
            y: state.meshOrigin.y - state.viewportDimensions.y / 2,
        }, state.scaleFactor, shl);

        const collection = new Collection([mesh, shl]);

        return collection;
    }
);

export const selectViewportDimensions = createSelector(
    selectState, (state): Point => {
        return state.viewportDimensions;
    }
);

export const selectCtrlPressed = createSelector(
    selectState, (state): boolean => {
        return state.pressedKeys.includes("ControlLeft");
    }
);

export const selectScaleFactor = createSelector(
    selectState, (state): number => {
        return state.scaleFactor;
    }
);
