import {  NextResponse } from "next/server";

// this file is here to test the to an api route 

export async function GET() {
    return NextResponse.json({ message: "Hello from the api!" });
}