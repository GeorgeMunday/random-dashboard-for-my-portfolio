import axios from "axios";

const CACHE_KEY = process.env.NEXT_PUBLIC_THEATERSALL_CACHE_KEY || "";
const CACHE_TIME = 5 * 60 * 1000;

export default async function getAllTheaters(): Promise<number | null> {
    if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            const data = JSON.parse(cached);

            if (Date.now() - data.timestamp < CACHE_TIME) {
                return data.theaters;
            }
        }

        try {
            const response = await axios.get("/api/theaters/count");

            const result = {
                theaters: response.data.collectionLength,
                timestamp: Date.now(),
            };

            localStorage.setItem(CACHE_KEY, JSON.stringify(result));

            return result.theaters;
        } catch (error) {
            console.error("Error fetching all theaters:", error);
            return null;
        }
    }

    return null;
}