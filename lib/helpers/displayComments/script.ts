import axios from "axios";

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
  date: string;
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