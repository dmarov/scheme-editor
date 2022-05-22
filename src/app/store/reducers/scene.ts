import { EntryType } from '@/app/models';
import { EntriesMap } from '@/app/models';
import { Point } from '@/lib/models';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from '../actions';

export const featureKey = 'scene';

export interface State {
    entries: EntriesMap;
    primaryColor: string;
    secondaryColor: string;
    extraColor: string;
    meshGap: number;
    meshOrigin: Point;
    viewportDimensions: Point;
    cursorPosition: Point;
    mouseEntered: boolean;
    mouseLeftPressed: boolean;
    scaleFactor: number;
    pressedKeys: string[];
    activeEntryId: number | null;
}

export const initialState: State = {
    entries: {
        "0": {
            type: EntryType.Square,
            origin: {x: 50, y: 50},
            size: 150,
        },
        "1": {
            type: EntryType.Square,
            origin: {x: 150, y: -250},
            size: 150,
        },
        "2": {
            type: EntryType.Square,
            origin: {x: 550, y: -100},
            size: 200,
        },
    },
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
    activeEntryId: null,
};

export const reducer = createReducer(
    initialState,
    on(SceneActions.setCursorPosition,
        (state, action): State => {
            return {
                ...state,
                cursorPosition: action.position,
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
    on(SceneActions.setMeshOrigin,
        (state, action): State => ({
            ...state,
            meshOrigin: {
                x: action.origin.x,
                y: action.origin.y,
            }
        })
    ),
    on(SceneActions.setEntryOrigin,
        (state, action): State => {
            const entries = {...state.entries};

            entries[`${action.id}`] = {
                ...entries[`${action.id}`],
                origin: {
                    x: action.origin.x,
                    y: action.origin.y,
                }
            };

            return { ...state, entries };
        }
    ),
    on(SceneActions.setActiveEntry,
        (state, action): State => ({
            ...state,
            activeEntryId: action.id,
        })
    ),
);
