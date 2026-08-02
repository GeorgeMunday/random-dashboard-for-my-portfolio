import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";

export async function GET(req: NextRequest) {
  try {
    const amount = req.nextUrl.searchParams.get("amount");
    const skip= req.nextUrl.searchParams.get("skip");

    if (amount === null || skip === null) {
      return NextResponse.json(
        {
          message: "Missing required query parameters: amount and skip",
        },
        { status: 400 }
      );
    }

    const amountNum = Number(amount);
    const skipNum = Number(skip);
    if (
      Number.isNaN(amountNum) ||
      Number.isNaN(skipNum) ||
      amountNum < 1 ||
      skipNum < 0
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid query parameters. 'amount' must be greater than 0 and 'skip' must be 0 or greater.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const collection = db.collection("comments");
    const documents = await collection
      .find({})
      .skip(skipNum)
      .limit(amountNum)
      .toArray();

    return NextResponse.json(
      {
        connected: true,
        message: "Comments retrieved successfully",
        count: documents.length,
        documents,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        connected: false,
        message: "Failed to retrieve comments",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}