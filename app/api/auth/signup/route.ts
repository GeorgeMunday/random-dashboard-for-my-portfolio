import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import clientPromise from "@/lib/database/connection";
import { createToken } from "@/lib/token/script";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                {
                    error: "Username and password are required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                {
                    error: "Password must be at least 8 characters.",
                },
                {
                    status: 400,
                }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        // check if it already exists in the database
        const existingUser = await db.collection("users").findOne({
            username,
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    error: "Username already exists.",
                },
                {
                    status: 409,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.collection("users").insertOne({
            username,
            password: hashedPassword,
            createdAt: new Date(),
        });

        const token = createToken({
            id: result.insertedId.toString(),
            username,
        });

        const response = NextResponse.json({
            message: "Account created successfully.",
            user: {
                id: result.insertedId.toString(),
                username,
            },
        });

        response.cookies.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return response;
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Internal server error.",
            },
            {
                status: 500,
            }
        );
    }
}