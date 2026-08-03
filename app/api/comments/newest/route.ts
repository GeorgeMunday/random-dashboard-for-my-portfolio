import { NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";

// this file is here to return the newest comment in the database and return a response of sample data
// it it intended to be used in the application

export async function GET() {
  try {
    
    const client = await clientPromise;

    const db = client.db("sample_mflix");
    const collection = db.collection("comments");

    const documents = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    return NextResponse.json({
      connected: true,
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