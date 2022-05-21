import { Point } from '@/lib/models';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from '../actions';

export const featureKey = 'scene';

export interface State {
    meshGap: number,
    viewportCenter: Point;
    viewportDimensions: Point,
    cursorPosition: Point;
}

export const initialState: State = {
    meshGap: 15,
    viewportCenter: {x: 0, y: 0},
    viewportDimensions: {x: 0, y: 0},
    cursorPosition: {x: 0, y: 0},
};

export const reducer = createReducer(
    initialState,
    on(SceneActions.setCursorPosition,
        (state, action): State => ({
            ...state,
            cursorPosition: action.position
        })
    ),
    on(SceneActions.setViewportCenter,
        (state, action): State => ({
            ...state,
            viewportCenter: action.center
        })
    ),
    on(SceneActions.setViewportDimensions,
        (state, action): State => ({
            ...state,
            viewportDimensions: action.dimensions,
            viewportCenter: { x: action.dimensions.x / 2, y: action.dimensions.y / 2 },
        })
    ),
);
