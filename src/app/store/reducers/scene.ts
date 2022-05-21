import { Point } from '@/lib/models';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from '../actions';

export const featureKey = 'scene';

export interface State {
    meshGap: number,
    viewportPivot: Point;
    viewportDimensions: Point,
    cursorPosition: Point;
    mouseEntered: boolean;
    mouseLeftPressed: boolean;
}

export const initialState: State = {
    meshGap: 20,
    viewportPivot: {x: 100, y: 100},
    viewportDimensions: {x: 0, y: 0},
    cursorPosition: {x: 0, y: 0},
    mouseEntered: false,
    mouseLeftPressed: false,
};

export const reducer = createReducer(
    initialState,
    on(SceneActions.setCursorPosition,
        (state, action): State => {
            const dx = state.mouseLeftPressed ? action.position.x - state.cursorPosition.x : 0;
            const dy = state.mouseLeftPressed ? action.position.y - state.cursorPosition.y : 0;

            return {
                ...state,
                cursorPosition: action.position,
                viewportPivot: {
                    x: state.viewportPivot.x + dx,
                    y: state.viewportPivot.y + dy,
                }
            };
        }
    ),
    on(SceneActions.setViewportCenter,
        (state, action): State => ({
            ...state,
            viewportPivot: action.center
        })
    ),
    on(SceneActions.setViewportDimensions,
        (state, action): State => ({
            ...state,
            viewportDimensions: action.dimensions,
        })
    ),
    on(SceneActions.setMouseEntered,
        (state, action): State => ({
            ...state,
            mouseEntered: action.entered
        })
    ),
    on(SceneActions.setMouseLeftPressed,
        (state, action): State => ({
            ...state,
            mouseLeftPressed: action.pressed
        })
    ),
);
