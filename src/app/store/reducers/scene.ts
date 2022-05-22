import { SerializableShapeType } from '@/app/models';
import { SerializableShapesMap } from '@/app/models';
import { Point } from '@/lib';
import { createReducer, on } from '@ngrx/store';
import { SceneActions } from '../actions';

export const featureKey = 'scene';

export interface State {
    shapes: SerializableShapesMap;
    // drawableShapes: SerializableShapesMap;
    drawableShapes: number[];
    // interactiveShapes: SerializableShapesMap;
    interactiveShapes: number[];
    intToDraw: {[key: string]: number};
    primaryColor: string;
    secondaryColor: string;
    extraColor: string;
    whiteColor: string;
    meshGap: number;
    meshOrigin: Point;
    viewportDimensions: Point;
    cursorPosition: Point;
    mouseEntered: boolean;
    mouseLeftPressed: boolean;
    scaleFactor: number;
    pressedKeys: string[];
    activeEntryId: number | null;
};

export const initialState: State = {
    shapes: {
        "0": {
            type: SerializableShapeType.Collection,
            payload: {
                origin: {x: 100, y: 100},
                entries: [ 1, 2 ],
            }
        },
        "1": {
            type: SerializableShapeType.Square,
            payload: {
                origin: {x: 0, y: 0},
                size: 150,
            }
        },
        "2": {
            type: SerializableShapeType.Joint,
            payload: {
                origin: {x: 150, y: 75},
                radius: 3,
            }
        },
        "3": {
            type: SerializableShapeType.Collection,
            payload: {
                origin: {x: 150, y: -250},
                entries: [ 4 ]
            }
        },
        "4": {
            type: SerializableShapeType.Square,
            payload: {
                origin: {x: 0, y: 0},
                size: 150,
            }
        },
        "5": {
            type: SerializableShapeType.Collection,
            payload: {
                origin: {x: 350, y: 100},
                entries: [ 6, 7 ]
            }
        },
        "6": {
            type: SerializableShapeType.Square,
            payload: {
                origin: {x: 0, y: 0},
                size: 200,
            }
        },
        "7": {
            type: SerializableShapeType.Joint,
            payload: {
                origin: {x: 0, y: 100},
                radius: 3,
            }
        },
        "8": {
            type: SerializableShapeType.Square,
            payload: {
                origin: {x: 100, y: 100},
                size: 150,
            }
        },
        "9": {
            type: SerializableShapeType.Square,
            payload: {
                origin: {x: 150, y: -250},
                size: 150,
            }
        },
        "10": {
            type: SerializableShapeType.Square,
            payload: {
                origin: {x: 350, y: 100},
                size: 200,
            }
        },
    },
    drawableShapes: [0, 3, 5],
    // drawableShapes: {
    //     "0": {
    //         type: SerializableShapeType.Collection,
    //         payload: {
    //             origin: {x: 100, y: 100},
    //             entries: [
    //                 {
    //                     type: SerializableShapeType.Square,
    //                     payload: {
    //                         origin: {x: 0, y: 0},
    //                         size: 150,
    //                     }
    //                 },
    //                 {
    //                     type: SerializableShapeType.Joint,
    //                     payload: {
    //                         origin: {x: 150, y: 75},
    //                         radius: 3,
    //                     }
    //                 },
    //             ]
    //         }
    //     },
    //     "1": {
    //         type: SerializableShapeType.Collection,
    //         payload: {
    //             origin: {x: 150, y: -250},
    //             entries: [
    //                 {
    //                     type: SerializableShapeType.Square,
    //                     payload: {
    //                         origin: {x: 0, y: 0},
    //                         size: 150,
    //                     }
    //                 }
    //             ]
    //         }
    //     },
    //     "2": {
    //         type: SerializableShapeType.Collection,
    //         payload: {
    //             origin: {x: 350, y: 100},
    //             entries: [
    //                 {
    //                     type: SerializableShapeType.Square,
    //                     payload: {
    //                         origin: {x: 0, y: 0},
    //                         size: 200,
    //                     }
    //                 },
    //                 {
    //                     type: SerializableShapeType.Joint,
    //                     payload: {
    //                         origin: {x: 0, y: 100},
    //                         radius: 3,
    //                     }
    //                 },
    //             ]
    //         }
    //     },
    // },
    interactiveShapes: [8, 9 ,10],
    // interactiveShapes: {
    //     "0": {
    //         type: SerializableShapeType.Square,
    //         payload: {
    //             origin: {x: 100, y: 100},
    //             size: 150,
    //         }
    //     },
    //     "1": {
    //         type: SerializableShapeType.Square,
    //         payload: {
    //             origin: {x: 150, y: -250},
    //             size: 150,
    //         }
    //     },
    //     "2": {
    //         type: SerializableShapeType.Square,
    //         payload: {
    //             origin: {x: 350, y: 100},
    //             size: 200,
    //         }
    //     },
    // },
    // intToDraw: {
    //     "0": 0,
    //     "1": 1,
    //     "2": 2,
    // },
    intToDraw: {
        "8": 0,
        "9": 3,
        "10": 5,
    },
    primaryColor: '#000000',
    secondaryColor: '#616161',
    extraColor: '#c4c2c2',
    whiteColor: '#FFFFFF',
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
    on(SceneActions.setObjectOrigin,
        (state: State, action): State => {
            const shapes = {...state.shapes};
            const entry = shapes[`${action.id}`];

            shapes[`${action.id}`] = {
                ...entry,
                payload: {
                    ...entry.payload,
                    origin: {
                        x: action.origin.x,
                        y: action.origin.y,
                    },
                }
            };

            return { ...state, shapes };
        }
    ),
    on(SceneActions.setActiveEntry,
        (state, action): State => ({
            ...state,
            activeEntryId: action.id,
        })
    ),
);
