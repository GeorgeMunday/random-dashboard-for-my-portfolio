import jwt from "jsonwebtoken";

import type { UserJwtPayload } from "../../types/user-jwt-payload";

export type { UserJwtPayload } from "../../types/user-jwt-payload";

const SECRET = process.env.JWT_SECRET!;

export function createToken(payload: UserJwtPayload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): UserJwtPayload {
  return jwt.verify(token, SECRET) as UserJwtPayload;
}