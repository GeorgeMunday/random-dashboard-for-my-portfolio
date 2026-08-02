import axios from "axios";

import { GetCommentsResponse } from "../displayComments/script";

export async function searchComments(text: string) {
  const response = await axios.get<GetCommentsResponse>(
    "/api/comments/search",
    {
      params: {
        text,
      },
    }
  );

  return response.data;
}