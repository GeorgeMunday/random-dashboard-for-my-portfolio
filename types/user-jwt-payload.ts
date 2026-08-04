import type { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

export interface UserJwtPayload extends BaseJwtPayload {
    id: string;
    username: string;
}