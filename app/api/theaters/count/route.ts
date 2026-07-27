import { NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("test");
    const collectionLength = await db.collection("theaters").countDocuments();

    return NextResponse.json({
      message: "Counted documents successfully",
      collectionLength,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}