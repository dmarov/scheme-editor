import { Point } from '@/lib/models';
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