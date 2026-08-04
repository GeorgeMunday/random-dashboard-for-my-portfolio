import type { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    email: string;
    clicks: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}