import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";

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
    const collection = db.collection("theaters");

    const documents = await collection
      .find({
        "location.address.city": {
          $regex: city,
          $options: "i",
        },
      })
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