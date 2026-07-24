import { NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const documents = await collection.find({}).limit(10).toArray();

    return NextResponse.json({
      message: "Connection successful",
      documents,
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