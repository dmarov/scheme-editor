import { Point } from '@/lib';
import { createAction, props } from '@ngrx/store';

export const setCursorPosition = createAction(
    '[Scene] setCursorPosition',
    props<{position: Point}>(),
);

export const setViewportCenter = createAction(
    '[Scene] setViewportCenter',
    props<{center: Point}>(),
);

export const setViewportDimensions = createAction(
    '[Scene] setViewportDimensions',
    props<{dimensions: Point}>(),
);

export const setMouseEntered = createAction(
    '[Scene] setMouseEntered',
    props<{entered: boolean}>(),
);

export const setMouseLeftPressed = createAction(
    '[Scene] setMouseLeftPressed',
    props<{pressed: boolean}>(),
);

export const setScaleFactor = createAction(
    '[Scene] setScaleFactor',
    props<{factor: number}>(),
);

export const addPressedKey = createAction(
    '[Scene] addPressedKey',
    props<{code: string}>(),
);

export const removePressedKey = createAction(
    '[Scene] removePressedKey',
    props<{code: string}>(),
);

export const setMeshOrigin = createAction(
    '[Scene] setMeshOrigin',
    props<{origin: Point}>(),
);

export const setActiveEntry = createAction(
    '[Scene] setActiveEntry',
    props<{id: number | null}>(),
);

export const tryMove = createAction(
    '[Scene] tryMove',
    props<{diff: Point}>(),
);

export const setInveractiveObjectOrigin = createAction(
    '[Scene] setInveractiveObjectOrigin',
    props<{
        id: number;
        origin: Point;
    }>(),
);

export const setDrawableObjectOrigin = createAction(
    '[Scene] setDrawableObjectOrigin',
    props<{
        id: number;
        origin: Point;
    }>(),
);
