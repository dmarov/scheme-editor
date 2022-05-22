import { EntriesMap, EntryType } from '@/app/models';
import { Collection, ShiftedLayer, Square } from '@/lib/classes';
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

        const squares: Square[] = [];

        for (const e of Object.values(state.entries)) {
            if (e.type === EntryType.Square) {
                const origin = new Point(e.origin.x, e.origin.y)
                squares.push(new Square(origin, 100, state.extraColor, state.secondaryColor))
            }
        }

        const sqs = new Collection(squares);

        const shl = new ShiftedLayer(state.meshOrigin, sqs);
        // TODO: implement scale
        const collection = new Collection([mesh, shl]);

        return collection;
    }
);

export const selectEntries = createSelector(
    selectState, (state): EntriesMap => {
        return state.entries;
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

export const selectRenderingSize = createSelector(
    selectState, (state): Point => {
        return new Point(
            state.viewportDimensions.x * state.scaleFactor,
            state.viewportDimensions.y * state.scaleFactor,
        );
    }
);

export const selectMouseLeftPressed = createSelector(
    selectState, (state): boolean => {
        return state.mouseLeftPressed;
    }
);

export const selectCursorPosition = createSelector(
    selectState, (state): Point => {
        return state.cursorPosition;
    }
);

export const selectMeshOrigin = createSelector(
    selectState, (state): Point => {
        return state.meshOrigin;
    }
);

export const selectHoveredInteractiveEntryId = createSelector(
    selectCursorPosition, selectEntries, selectMeshOrigin, (position, entries, origin): number | null => {

        for(const [k, v] of Object.entries(entries)) {
            if (v.type === EntryType.Square) {
                if (v.origin.x + origin.x < position.x && position.x < v.origin.x + origin.x + v.size) {
                    if (v.origin.y + origin.y < position.y && position.y < v.origin.y + origin.y + v.size) {
                        return parseInt(k);
                    }
                }
            }
        }

        return null;
    }
);
