import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/token/script";

export async function GET(req: NextRequest) {

    const token = req.cookies.get("session")?.value;

    if (!token) {
        return NextResponse.json(
            {
                user: null,
            },
            {
                status: 401,
            }
        );
    }

    try {

        const user = verifyToken(token);

        return NextResponse.json({
            user,
        });

    } catch {

        return NextResponse.json(
            {
                user: null,
            },
            {
                status: 401,
            }
        );
    }

}