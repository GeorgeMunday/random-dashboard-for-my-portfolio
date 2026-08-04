"use client";

import { useAuth } from "@/lib/context/AuthContext";
import useOnlineStatus from "@/lib/customHooks/useOnlineStatus";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";

import Header from "@/components/molecules/Header/Header";
import UserInformationTile from "@/components/molecules/UserInformationTile/UserInformationTile";

export function DashboardSkeleton() {
    const [information, setInformation] = useState(false);
    const { signout } = useAuth();
    const router = useRouter();
    const isOnline = useOnlineStatus();

    const user = {
        id: "123",
        username: "NA",
        email: "john.doe@example.com"
    }

    return (
        <main className="min-h-screen bg-gray-100 animate-pulse">
            <Header information={information} setInformation={setInformation} />
            <div className="gap-6 p-6 flex flex-col">
                <UserInformationTile user={user} signout={signout} />

                {/* action button and also random navigation */}
                <div className="flex flex-col gap-6 md:flex-row w-full">
                    <div className="rounded-xl bg-white p-6 shadow w-full md:w-1/2">
                        <h2 className="text-lg font-semibold">Dashboard Navigation</h2>
                        <div className="flex flex-col gap-4 mt-4">
                            <button
                                className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                                onClick={() => router.push("/dashboard/comments")}
                            >
                                Go to Comments Dashboard <FaArrowRight />
                            </button>
                            <button
                                className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                                onClick={() => router.push("/dashboard/theaters")}
                            >
                                Go to Theaters Dashboard <FaArrowRight />
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                        <h2 className="text-lg font-semibold">Random Dashboard Navigation</h2>

                        <div className="flex items-center justify-center">
                            <button
                                type="button"
                                className="flex h-20 w-20 items-center text-white justify-center rounded-full bg-blue-500 text-sm font-medium transition hover:bg-blue-400"></button>
                        </div>
                    </div>
                </div>

                {/* statistics */}
                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                    <h2 className="text-lg font-semibold">Statistics</h2>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-blue-100 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500">0</p>
                            <p className="text-sm text-black">Total Users</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500">0</p>
                            <p className="text-sm text-black">Sample Data Comments</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500">0</p>
                            <p className="text-sm text-black">Sample Data Theaters</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                    <h2 className="text-lg font-semibold">Random Number Generator</h2>

                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            className="flex h-20 w-20 items-center text-white justify-center rounded-full bg-blue-500 text-sm font-medium transition hover:bg-blue-400"
                        >
                        </button>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                    <h2 className="text-lg font-semibold">Server Information</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-blue-100 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500">{isOnline ? "Connected" : "Disconnected"}</p>
                            <p className="text-sm text-black">WiFi Status</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500">N/A</p>
                            <p className="text-sm text-black">Server Latency</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500">N/A</p>
                            <p className="text-sm text-black">Database Status</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DashboardSkeleton;