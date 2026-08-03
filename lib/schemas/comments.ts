import { ObjectId } from "mongodb";

export interface CommentDocument {
  _id: ObjectId;
  name: string;
  email: string;
  movie_id: ObjectId;
  text: string;
  createdAt: Date;
}