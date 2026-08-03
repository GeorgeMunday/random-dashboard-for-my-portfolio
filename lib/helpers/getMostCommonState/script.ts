import axios from "axios";

const CACHE_KEY =
  process.env.NEXT_PUBLIC_GETMOSTCOMMONSTATE_CACHE_KEY ??
  "mostCommonStateCache";

const CACHE_TIME = 5 * 60 * 1000;

export default async function getMostCommonState() {
  if (typeof window === "undefined") {
    return null;
  }

  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    try {
      const data = JSON.parse(cached);

      if (
        data &&
        typeof data.timestamp === "number" &&
        Date.now() - data.timestamp < CACHE_TIME
      ) {
        return data;
      }
    } catch (error) {
      console.warn("Corrupted cache, refetching:", error);
      localStorage.removeItem(CACHE_KEY);
    }
  }

  try {
    const response = await axios.get("/api/theaters/mostCommonState");

    const result = {
      mostCommonState: response.data.mostCommonState,
      count: response.data.count,
      timestamp: Date.now(),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Error fetching most common state:", error);
    throw error;
  }
}