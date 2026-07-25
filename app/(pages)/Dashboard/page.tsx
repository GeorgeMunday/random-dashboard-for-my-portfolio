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
    
    const [randomNum, setRandomNum] = useState(0)

    const randomLoader = () => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 2);
                setRandomNum(randomNumber);
            }, 100 * i);
        }
    }

    const handelRandomNum = () => {
        const randomNumber = Math.floor(Math.random() * 2);
        setRandomNum(randomNumber);
    }

    const handelRandomButtonClick = () => {
        if (randomNum === 0) {
            router.push("/dashboard/movies");
        } else if (randomNum === 1) {
            router.push("/dashboard/weather");
        } 
    }

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
                                This is your personalized dashboard — access features and information tailored just for you.
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
                                router.push("/dashboard/movies");
                            }
                        }>
                            Go to Movies Dashboard <FaArrowRight />
                        </button>
                        <button  className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                        onClick={
                            () => {
                                router.push("/dashboard/weather");
                            }
                        }>
                            Go to Weather Dashboard <FaArrowRight />
                        </button>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                        <h2 className="text-lg font-semibold">
                            Random Dashboard Navigation
                        </h2>

                        <div className="flex items-center justify-center">
                            <button
                                type="button"
                                className="flex h-20 w-20 items-center text-white justify-center rounded-full bg-blue-500 text-sm font-medium text-neutral-700transition hover:bg-blue-400"
                            >
                                Click Here
                            </button>
                        </div>
                    </div>
                </div>
                {/* statistics */}
                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                    <h2 className="text-lg font-semibold">
                        Statistics
                    </h2>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">128</p>
                            <p className="text-sm text-black">Users Online</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">72°F</p>
                            <p className="text-sm text-black">Temperature</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">1,024</p>
                            <p className="text-sm text-black">Movies</p>
                        </div>
                    </div>
                </div>




                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                        <h2 className="text-lg font-semibold">
                            Random Dashboard Navigation
                        </h2>

                        <div className="flex items-center justify-center">
                            <button
                                type="button"
                                className="flex h-20 w-20 items-center text-white justify-center rounded-full bg-blue-500 text-sm font-medium text-neutral-700transition hover:bg-blue-400"
                            >
                                Click Here
                            </button>
                        </div>
                    </div>
                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                    <h2 className="text-lg font-semibold">
                          Server Information  
                    </h2>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;