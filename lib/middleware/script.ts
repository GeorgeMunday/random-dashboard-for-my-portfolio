import crypto from "crypto";

export default function generateMiddlewareToken(): string {
    const secret: string = process.env.MIDDLEWARE_TOKEN ?? "0101";

    const twentyFourHours: number = 24 * 60 * 60 * 1000;
    const timestamp: number = Math.floor(Date.now() / twentyFourHours);

    const token: string = crypto
        .createHash("sha256")
        .update(`${secret}-${timestamp}`)
        .digest("hex");

    return token;
}