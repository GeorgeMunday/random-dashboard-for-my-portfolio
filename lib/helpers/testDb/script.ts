import axios from "axios";

const CACHE_KEY = process.env.NEXT_PUBLIC_USERSALL_CACHE_KEY || "";
const CACHE_TIME = 5 * 60 * 1000;

export default async function getAllUsers() {
    if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            const data = JSON.parse(cached);

            if (
                Date.now() - data.timestamp < CACHE_TIME &&
                typeof data.users === "number"
            ) {
                return data.users;
            }
        }

        try {
            const response = await axios.get("/api/users/count");
            const count = response.data?.collectionLength ?? 0;
            const result = {
                users: count,
                timestamp: Date.now(),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(result));
            return result.users;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }
    return null;
}