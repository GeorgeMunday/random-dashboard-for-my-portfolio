import axios from "axios";

import type {
  CommentDocument,
  DeleteCommentResponse,
  GetCommentsParams,
  GetCommentsResponse,
} from "@/types/comments-api";

export type {
  CommentDocument,
  DeleteCommentResponse,
  GetCommentsParams,
  GetCommentsResponse,
} from "@/types/comments-api";

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