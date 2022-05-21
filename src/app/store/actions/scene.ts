import { Point } from '@/lib/models';
import { createAction, props } from '@ngrx/store';

export const setCursorPosition = createAction(
    '[Scene] setCursorPosition',
    props<{position: Point}>(),
);
