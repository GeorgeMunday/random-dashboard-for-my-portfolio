import type { AuthUser } from "./auth-user";

export interface UserInformationTileProps {
    user: AuthUser;
    signout: () => void;
}