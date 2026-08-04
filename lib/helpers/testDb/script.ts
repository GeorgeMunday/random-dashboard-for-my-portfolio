import axios from "axios";

import type { DbTestResult } from "@/types/db-test-result";

const CACHE_KEY = process.env.NEXT_PUBLIC_DBSTATUS_CACHE_KEY || "dbStatusCache";
const CACHE_TIME = 5 * 60 * 1000;

export default async function testDatabaseConnection(): Promise<DbTestResult> {
    if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
            try {
                const data = JSON.parse(cached);

                if (
                    data &&
                    typeof data.timestamp === "number" &&
                    typeof data.connected === "boolean" &&
                    typeof data.apiTime === "number" &&
                    Date.now() - data.timestamp < CACHE_TIME
                ) {
                    return { connected: data.connected, apiTime: data.apiTime };
                }
            } catch (error) {
                console.warn("Corrupted db status cache, refetching:", error);
                localStorage.removeItem(CACHE_KEY);
            }
        }

        try {
            const start = performance.now();
            const response = await axios.get("/api/test");
            const apiTime = performance.now() - start;

            const connected = response.data?.connected === true;
            const result = {
                connected,
                apiTime,
                timestamp: Date.now(),
            };

            localStorage.setItem(CACHE_KEY, JSON.stringify(result));

            return { connected, apiTime };
        } catch (error) {
            console.error("Error testing database connection:", error);
            return { connected: false, apiTime: null };
        }
    }

    return { connected: false, apiTime: null };
}