"use client";

import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Header from "@/components/molecules/Header/Header";

export  function Dashboard() {
    const [information, setInformation] = useState(false);

    const { user, loading, signout } = useAuth();

    const router = useRouter();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg font-semibold">
                    You are not signed in.
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-neutral-950">
           <Header
                information={information}
                setInformation={setInformation}
            />

            <div className="mx-auto grid max-w-7xl gap-6 p-6 md:grid-cols-3">
                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                    <h2 className="text-lg font-semibold">
                        Account
                    </h2>

                    <div className="mt-4 space-y-2">
                        <p>
                            <span className="font-medium">
                                Username:
                            </span>{" "}
                            {user.username}
                        </p>

                        <p>
                            <span className="font-medium">
                                User ID:
                            </span>{" "}
                            {user.id}
                        </p>
                    </div>

                     <button
                        onClick={signout}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;