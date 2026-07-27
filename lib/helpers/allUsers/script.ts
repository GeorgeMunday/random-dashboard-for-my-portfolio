import axios from "axios";

const CACHE_KEY = process.env.NEXT_PUBLIC_USERSALL_CACHE_KEY || "";
const CACHE_TIME = 5 * 60 * 1000;

export default async function getAllUsers(): Promise<number | null> {
    if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            const data = JSON.parse(cached);

            if (Date.now() - data.timestamp < CACHE_TIME) {
                return data.users;
            }
        }

        try {
            const response = await axios.get("/api/users/count");

            const result = {
                users: response.data.collectionLength,
                timestamp: Date.now(),
            };

            localStorage.setItem(CACHE_KEY, JSON.stringify(result));

            return result.users;
        } catch (error) {
            console.error("Error fetching all users:", error);
            return null;
        }
    }

    return null;
}