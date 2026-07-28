import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/database/connection";

// this file is here to return all of the theaters in the database and return a response of sample data
// it it intended to be used in the application

export async function GET(req: NextRequest) {
  try {
    const amount = req.nextUrl.searchParams.get("amount") ?? "0";
    const skip = req.nextUrl.searchParams.get("skip") ?? "0";
    const client = await clientPromise;

    const db = client.db("sample_mflix");
    const collection = db.collection("theaters");

    const documents = await collection
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(amount))
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