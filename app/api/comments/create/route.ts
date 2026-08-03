import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";
import { verifyToken } from "@/lib/token/script";
import { CommentDocument } from "@/lib/schemas/comments";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    const { name, text } = await req.json();

    if (!name || !text) {
      return NextResponse.json(
        { message: "Name and text are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const collection = db.collection<CommentDocument>("comments");
    const result = await collection.insertOne({
      _id: new ObjectId(),
      name,
      text,
      email: user.username,
      movie_id: new ObjectId(),
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        insertedId: result.insertedId,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}