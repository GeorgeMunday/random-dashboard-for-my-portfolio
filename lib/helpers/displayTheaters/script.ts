import axios from "axios";

import type {
  GetTheatersParams,
  GetTheatersResponse,
  TheaterDocument,
} from "@/types/theaters-api";

export type {
  GetTheatersParams,
  GetTheatersResponse,
  TheaterDocument,
} from "@/types/theaters-api";

export async function getTheaters({
  amount = 10,
  skip = 0,
}: GetTheatersParams = {}) {
  const response = await axios.get<GetTheatersResponse>("/api/theaters/display", {
    params: {
      amount,
      skip,
    },
  });

  return response.data;
}