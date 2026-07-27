"use client";
    
import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {FaArrowRight} from "react-icons/fa"

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";

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


    if (information) {
        return (
            <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black ">
                <Header
                    information={information}
                    setInformation={setInformation}
                />
                <Information />
            </div>
        );
    }


    return (
        <main className="min-h-screen  bg-gray-100 dark:bg-neutral-950">
           <Header
                information={information}
                setInformation={setInformation}
            />

            <div className=" gap-6 p-6 flex flex-col">
                {/* welcome message that has user information */}
                    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold">
                                    Welcome, <span className="font-bold text-blue-500">{user.username ?? "there"}</span>
                                </h1>
                                <p className="text-xl text-neutral-500 dark:text-neutral-400">
                                    This is your Theaters dashboard — access features here and manage your account.
                                </p>
                            </div>

                            <button
                                onClick={signout}
                                className="shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                    {/* action button and also random navigation */}
                    <div className="flex flex-col gap-6 md:flex-row w-full">
                        <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                            <h2 className="text-lg font-semibold">
                                Dashboard Navigation
                            </h2>
                            <div className="flex flex-col gap-4 mt-4">
                            <button  className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard");
                                }
                            }>
                                Go to Home Dashboard <FaArrowRight />
                            </button>
                            <button  className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard/comments");
                                }
                            }>
                                Go to Comments Dashboard <FaArrowRight />
                            </button>
                            <button className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard/theaters");
                                }
                            }>
                                Go to Theaters Dashboard <FaArrowRight />
                            </button>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                            <h2 className="text-lg font-semibold">
                                Display Theaters
                            </h2>
                        </div>
                    </div>
               </div>
        </main>
    );
}

export default Dashboard;