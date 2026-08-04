export interface DeleteCommentResponse {
    success: boolean;
    message?: string;
    deletedCount?: number;
    deletedId?: string;
    error?: string;
}

export interface GetCommentsParams {
    amount?: number;
    skip?: number;
}

export interface CommentDocument {
    _id: string;
    name: string;
    email: string;
    movie_id: string;
    text: string;
    createdAt: string;
}

export interface GetCommentsResponse {
    connected: boolean;
    message: string;
    count: number;
    documents: CommentDocument[];
}