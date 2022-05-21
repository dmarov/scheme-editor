import { Point } from '@/lib/models';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from '../actions';

export const featureKey = 'scene';

export interface State {
    primaryColor: string,
    secondaryColor: string,
    extraColor: string,
    meshGap: number,
    meshOrigin: Point;
    viewportDimensions: Point,
    cursorPosition: Point;
    mouseEntered: boolean;
    mouseLeftPressed: boolean;
    scaleFactor: number;
    pressedKeys: string[],
}

export const initialState: State = {
    primaryColor: '#000000',
    secondaryColor: '#616161',
    extraColor: '#c4c2c2',
    meshGap: 20,
    meshOrigin: {x: 700, y: 400},
    viewportDimensions: {x: 0, y: 0},
    cursorPosition: {x: 0, y: 0},
    mouseEntered: false,
    mouseLeftPressed: false,
    scaleFactor: 1,
    pressedKeys: [],
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
                meshOrigin: {
                    x: state.meshOrigin.x + dx,
                    y: state.meshOrigin.y + dy,
                }
            };
        }
    ),
    on(SceneActions.setViewportCenter,
        (state, action): State => ({
            ...state,
            meshOrigin: action.center
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
    on(SceneActions.setScaleFactor,
        (state, action): State => ({
            ...state,
            scaleFactor: Math.min(Math.max(0.05, action.factor), 10),
        })
    ),
    on(SceneActions.addPressedKey,
        (state, action): State => ({
            ...state,
            pressedKeys: [...state.pressedKeys, action.code]
        })
    ),
    on(SceneActions.removePressedKey,
        (state, action): State => ({
            ...state,
            pressedKeys: state.pressedKeys.filter(code => code !== action.code)
        })
    ),
);
