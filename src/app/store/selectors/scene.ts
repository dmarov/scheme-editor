import { SerializableShapesMap, SerializableShapeType } from '@/app/models';
import { Collection, Joint, ShiftedLayer, Square } from '@/lib';
import { Point, Mesh } from '@/lib';
import { Drawable } from '@/lib/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureKey } from '../reducers/scene';

export const selectState = createFeatureSelector<State>(
    featureKey
);

export const selectRenderingModel = createSelector(
    selectState, (state: State): Drawable => {

        const mesh = new Mesh(
            state.meshOrigin,
            state.viewportDimensions,
            state.meshGap,
            state.primaryColor,
            state.secondaryColor,
            state.extraColor,
        );

        const shapes: Drawable[] = []

        for (const e of Object.values(state.shapes)) {
            // TODO: need to refactor it
            if (e.type === SerializableShapeType.Square) {
                const payload = e.payload;
                const origin = new Point(payload.origin.x, payload.origin.y)
                shapes.push(new Square(origin, payload.size, state.extraColor, state.secondaryColor))
            } else if (e.type === SerializableShapeType.Joint) {
                const payload = e.payload;
                shapes.push(new Joint(payload.origin, payload.radius, state.primaryColor))
            }
        }

        const objects = new Collection(shapes);

        const shl = new ShiftedLayer(state.meshOrigin, objects);
        // TODO: implement scale
        const collection = new Collection([mesh, shl]);

        return collection;
    }
);

export const selectShapes = createSelector(
    selectState, (state): SerializableShapesMap => {
        return state.shapes;
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
    selectCursorPosition, selectShapes, selectMeshOrigin, (position, shapes, origin): number | null => {
        const cursorX = position.x - origin.x;
        const cursorY = position.y - origin.y;

        for (const [k, v] of Object.entries(shapes)) {
            // TODO: need to refactor it
            if (v.type === SerializableShapeType.Square) {
                if (v.payload.origin.x < cursorX && cursorX < v.payload.origin.x + v.payload.size) {
                    if (v.payload.origin.y < cursorY && cursorY < v.payload.origin.y + v.payload.size) {
                        return parseInt(k);
                    }
                }
            }
        }

        return null;
    }
);

export const selectActiveEntryId = createSelector(
    selectState, (state): number | null => state.activeEntryId
);

export const selectActiveEntry = createSelector(
    selectActiveEntryId,
    selectShapes,
    (id, shapes) => {
        return shapes[`${id}`]?.payload ?? null;
    }
);
