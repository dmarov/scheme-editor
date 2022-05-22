import { EntryType } from "@/app/models";

export interface Entry {
    type: EntryType;
    payload: any;
}
