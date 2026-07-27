import axios from "axios";

const CACHE_KEY = process.env.NEXT_PUBLIC_USERSALL_CACHE_KEY || "usersCountCache";
const CACHE_TIME = 5 * 60 * 1000;

export default async function getAllUsers(): Promise<number | null> {
    if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            try {
                const data = JSON.parse(cached);

                if (
                    data &&
                    typeof data.timestamp === "number" &&
                    typeof data.users === "number" &&
                    Date.now() - data.timestamp < CACHE_TIME
                ) {
                    return data.users;
                }
            } catch (error) {
                console.warn("Corrupted users cache, refetching:", error);
                localStorage.removeItem(CACHE_KEY);
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
            return null;
        }
    }

    return null;
}