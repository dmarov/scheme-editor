import { SerializableShape, SerializableShapesMap, SerializableShapeType } from '@/app/models';
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

        const drawableShapes: Drawable[] = []

        for (const e of Object.values(state.drawableShapes)) {
            // TODO: need to refactor it
            // if (e.type === SerializableShapeType.Square) {
            //     const payload = e.payload;
            //     const origin = new Point(payload.origin.x, payload.origin.y)
            //     drawableShapes.push(new Square(origin, payload.size, state.extraColor, state.secondaryColor))
            // } else if (e.type === SerializableShapeType.Joint) {
            //     const payload = e.payload;
            //     drawableShapes.push(new Joint(payload.origin, payload.radius, state.primaryColor))
            // }
            if (e.type === SerializableShapeType.Collection) {
                const serializableShapes: SerializableShape[] = e.payload.entries;
                const origin: Point = e.payload.origin;
                const drawables: Drawable[] = [];

                for (const shape of serializableShapes) {
                    if (shape.type === SerializableShapeType.Square) {
                        const payload = shape.payload;
                        const origin = new Point(payload.origin.x, payload.origin.y)
                        drawables.push(new Square(origin, payload.size, state.extraColor, state.secondaryColor))
                    }
                }

                const collection = new Collection(origin, drawables);
                drawableShapes.push(collection);
            }
        }

        const objects = new Collection({x: 0, y: 0}, drawableShapes);

        const shl = new ShiftedLayer(state.meshOrigin, objects);
        // TODO: implement scale
        const collection = new Collection({x: 0, y: 0}, [mesh, shl]);

        return collection;
    }
);

export const selectShapes = createSelector(
    selectState, (state): SerializableShapesMap => {
        return state.drawableShapes;
    }
);

export const selectInteractiveShapes = createSelector(
    selectState, (state): SerializableShapesMap => {
        return state.interactiveShapes;
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
    selectCursorPosition, selectInteractiveShapes, selectMeshOrigin, (position, drawableShapes, origin): number | null => {
        const cursorX = position.x - origin.x;
        const cursorY = position.y - origin.y;

        for (const [k, v] of Object.entries(drawableShapes)) {
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
    (id, drawableShapes) => {
        return drawableShapes[`${id}`]?.payload ?? null;
    }
);
