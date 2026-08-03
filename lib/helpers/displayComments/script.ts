import axios from "axios";

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

export async function getComments({
  amount = 10,
  skip = 0,
}: GetCommentsParams = {}): Promise<GetCommentsResponse> {
  const { data } = await axios.get<GetCommentsResponse>(
    "/api/comments/display",
    {
      params: {
        amount,
        skip,
      },
    }
  );

  return data;
}

export async function deleteComment(commentId: string): Promise<DeleteCommentResponse> {
  const { data } = await axios.delete<DeleteCommentResponse>(
    "/api/comments/delete",
    {
      params: { id: commentId },
    }
  );

  return data;
}