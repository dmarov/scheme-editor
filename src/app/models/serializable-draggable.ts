import { SerializableShapeType } from "@/app/models";

export interface SerializableShape {
    type: SerializableShapeType;
    payload: any;
}
