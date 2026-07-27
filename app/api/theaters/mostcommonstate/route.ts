import { NextResponse } from "next/server";
import clientPromise from "@/lib/database/connection";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  try {
    const result = await db.collection("theaters").aggregate<{
      _id: string;
      count: number;
    }>([
      {
        $group: {
          _id: "$location.address.state",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]).toArray();

    return NextResponse.json({
      mostCommonState: result[0]._id,
      count: result[0].count,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}