import jwt, { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export interface UserJwtPayload extends BaseJwtPayload {
  id: string;
  username: string;
}

export function createToken(payload: UserJwtPayload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): UserJwtPayload {
  return jwt.verify(token, SECRET) as UserJwtPayload;
}