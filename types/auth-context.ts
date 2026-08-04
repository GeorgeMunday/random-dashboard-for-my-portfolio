import type { AuthUser } from "./auth-user";

export interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    signin(username: string, password: string): Promise<void>;
    signup(username: string, password: string): Promise<void>;
    signout(): Promise<void>;
}