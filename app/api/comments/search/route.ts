import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";

export async function GET(req: NextRequest) {
  try {
    const text = req.nextUrl.searchParams.get("text")?.trim();

    if (!text) {
      return NextResponse.json(
        {
          connected: false,
          message: "Query parameter 'text' is required.",
          documents: [],
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const collection = db.collection("comments");

    const documents = await collection
      .find({
        text: {
          $regex: text,
          $options: "i",
        },
      })
      .limit(50)
      .toArray();

    return NextResponse.json({
      connected: true,
      message: `${documents.length} comment(s) found.`,
      count: documents.length,
      documents,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        connected: false,
        message: "Failed to search comments.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}