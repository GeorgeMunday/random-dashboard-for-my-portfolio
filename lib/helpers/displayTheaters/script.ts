import axios from "axios";

export interface GetTheatersParams {
  amount?: number;
  skip?: number;
}

export interface TheaterDocument {
  _id: string;
  theaterId: number;
  location: {
    address: {
      street1: string;
      city: string;
      state: string;
      zipcode: string;
    };
    geo: {
      type: string;
      coordinates: number[];
    };
  };
}

export interface GetTheatersResponse {
  connected: boolean;
  message: string;
  documents: TheaterDocument[];
}

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