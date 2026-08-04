export interface NewestComment {
    [key: string]: unknown;
}

export type CachedNewestComment = {
    comment: NewestComment;
    timestamp: number;
};