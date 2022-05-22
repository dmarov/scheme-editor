import { SerializableShape, SerializableShapesMap, SerializableShapeType } from '@/app/models';
import { Collection, Joint, ShiftedLayer, Square } from '@/lib';
import { Point, Mesh } from '@/lib';
import { Drawable } from '@/lib/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, featureKey } from '../reducers/scene';

export const selectState = createFeatureSelector<State>(
    featureKey
);

export const selectShapes = createSelector(
    selectState, (state): SerializableShapesMap => {
        return state.shapes;
    }
);

export const selectInteractiveShapes = createSelector(
    selectState, (state): SerializableShapesMap => {
        return Object.fromEntries(
            Object.entries(state.shapes)
                .filter(([k,]) => state.interactiveShapes.includes(parseInt(k)))
        );
    }
);

export const selectDrawableShapes = createSelector(
    selectState, (state): SerializableShapesMap => {
        return Object.fromEntries(
            Object.entries(state.shapes)
                .filter(([k,]) => state.drawableShapes.includes(parseInt(k)))
        );
    }
);

export const selectRenderingModel = createSelector(
    selectState, selectShapes, (state: State, shapes): Drawable => {

        const mesh = new Mesh(
            state.meshOrigin,
            state.viewportDimensions,
            state.meshGap,
            state.primaryColor,
            state.secondaryColor,
            state.extraColor,
        );

        const res: Drawable[] = [];
        const drawableShapes = Object.entries(shapes)
            .filter(([k, v]) => state.drawableShapes.includes(parseInt(k)))
            .map(([k, v]) => v);


        for (const e of drawableShapes) {
            // TODO: need to refactor it
            if (e.type === SerializableShapeType.Collection) {
                const serializableShapes: SerializableShape[] = Object.entries(shapes)
                    .filter(([k,]) => e.payload.entries.includes(parseInt(k)))
                    .map(([, v]) => v);

                const origin: Point = e.payload.origin;
                const drawables: Drawable[] = [];

                for (const shape of serializableShapes) {
                    if (shape.type === SerializableShapeType.Square) {
                        const payload = shape.payload;
                        const origin = new Point(payload.origin.x, payload.origin.y)
                        drawables.push(new Square(origin, payload.size, state.extraColor, state.secondaryColor))
                    } else if (shape.type === SerializableShapeType.Joint) {
                        const payload = shape.payload;
                        const origin = new Point(payload.origin.x, payload.origin.y)
                        drawables.push(new Joint(origin, payload.radius, state.primaryColor));
                    }
                }

                const collection = new Collection(origin, drawables);
                res.push(collection);
            }
        }

        const objects = new Collection({x: 0, y: 0}, res);

        const shl = new ShiftedLayer(state.meshOrigin, objects);
        // TODO: implement scale
        const collection = new Collection({x: 0, y: 0}, [mesh, shl]);

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
    selectCursorPosition, selectInteractiveShapes, selectMeshOrigin, (position, interactiveShapes, origin): number | null => {
        const cursorX = position.x - origin.x;
        const cursorY = position.y - origin.y;

        for (const [k, v] of Object.entries(interactiveShapes)) {
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
