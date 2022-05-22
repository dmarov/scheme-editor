import { EntryType, Point } from "@/app/models";

export interface Entry {
    type: EntryType;
    origin: Point;
    size: number;
}
