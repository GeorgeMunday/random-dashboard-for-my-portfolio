import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "A valid comment id is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const commentsCollection = db.collection("comments");
    const objectId = new ObjectId(id);

    const result = await commentsCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Comment not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        deletedCount: result.deletedCount,
        deletedId: id,
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