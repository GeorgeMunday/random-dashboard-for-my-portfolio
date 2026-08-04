import type { ObjectId } from "mongodb";

export interface Idea {
    _id?: ObjectId;
    text: string;
    createdAt: Date;
}