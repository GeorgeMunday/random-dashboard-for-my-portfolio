import type { NewestComment } from "./newest-comment";

export interface DashboardCommentDocument extends NewestComment {
    name?: string;
    email?: string;
    text?: string;
    createdAt?: string | number | Date | null;
}