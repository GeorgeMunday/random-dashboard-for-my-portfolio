import axios from "axios";

const CACHE_KEY = process.env.NEXT_PUBLIC_COMMENTSALL_CACHE_KEY || "";
const CACHE_TIME = 5 * 60 * 1000;

export default async function getAllComments() {
    if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            const data = JSON.parse(cached);

            if (Date.now() - data.timestamp < CACHE_TIME) {
                return data.comments;
            }
        }

        try {
            const response = await axios.get("/api/comments/count");
            const result = {
                comments: response.data,
                timestamp: Date.now(),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(result.comments));
            return result.comments;
        } catch (error) {
            console.error("Error fetching all comments:", error);
            throw error;
        }
    }
    return null;
}