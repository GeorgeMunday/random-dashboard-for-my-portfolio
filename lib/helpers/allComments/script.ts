import axios from "axios";

const CACHE_KEY = process.env.NEXT_PUBLIC_COMMENTSALL_CACHE_KEY || "commentsCountCache";
const CACHE_TIME = 5 * 60 * 1000;

export default async function getAllComments(): Promise<number | null> {
    if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            try {
                const data = JSON.parse(cached);

                if (
                    data &&
                    typeof data.timestamp === "number" &&
                    typeof data.comments === "number" &&
                    Date.now() - data.timestamp < CACHE_TIME
                ) {
                    return data.comments;
                }
            } catch (error) {
                console.warn("Corrupted comments cache, refetching:", error);
                localStorage.removeItem(CACHE_KEY);
            }
        }

        try {
            const response = await axios.get("/api/comments/count");
            const count = response.data?.collectionLength ?? 0;

            const result = {
                comments: count,
                timestamp: Date.now(),
            };

            localStorage.setItem(CACHE_KEY, JSON.stringify(result));

            return result.comments;
        } catch (error) {
            console.error("Error fetching all comments:", error);
            return null;
        }
    }
    return null;
}