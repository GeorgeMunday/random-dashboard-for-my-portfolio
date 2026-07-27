import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import clientPromise from "@/lib/database/connection";
import { createToken } from "@/lib/token/script";

export async function POST(req: Request) {

    const { username, password } = await req.json();

    const client = await clientPromise;

    const db = client.db();

    const user = await db.collection("users").findOne({
        username,
    });

    if (!user) {
        return NextResponse.json(
            {
                error: "Invalid username",
            },
            {
                status: 401,
            }
        );
    }

    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid) {
        return NextResponse.json(
            {
                error: "Invalid password",
            },
            {
                status: 401,
            }
        );
    }

    const token = createToken({
        id: user._id.toString(),
        username: user.username,
    });

    const response = NextResponse.json({

        user: {
            id: user._id.toString(),
            username: user.username,
        },

    });

    response.cookies.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return response;
}