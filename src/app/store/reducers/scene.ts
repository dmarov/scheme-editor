import { Point } from '@/lib/models';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from '../actions';

export const featureKey = 'scene';

export interface State {
    cursorPosition: Point;
}

export const initialState: State = {
    cursorPosition: new Point(0, 0),
};

export const reducer = createReducer(
    initialState,
    on(SceneActions.setCursorPosition,
        (state, action) => ({ ...state, cursorPosition: action.position })
    ),
);
