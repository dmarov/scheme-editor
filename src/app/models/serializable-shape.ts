import { ShapeType } from "@/app/models";

export interface SerializableShape {
    type: ShapeType;
    payload: any;
}
