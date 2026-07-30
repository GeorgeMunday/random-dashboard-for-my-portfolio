import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";

// this function handles the GET request to search for comments based on the city query parameter

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get("city")?.trim() ?? "";

    if (!city) {
      return NextResponse.json(
        {
          message: "City query parameter is required.",
          documents: [],
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const collection = db.collection("comments");

    const documents = await collection
      .find({})
      .limit(50)
      .toArray();

    return NextResponse.json({
      connected: true,
      message: "Connection successful",
      documents,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        connected: false,
        message: "Connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}