import axios from "axios";

import { GetTheatersResponse } from "@/lib/helpers/displayTheaters/script";

export async function searchTheaters(city: string) {
  const response = await axios.get<GetTheatersResponse>(
    "/api/theaters/search",
    {
      params: {
        city,
      },
    }
  );

  return response.data;
}