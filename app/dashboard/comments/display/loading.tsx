"use client";

import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";

export default function Loading() {
    const [information, setInformation] = useState(false);

    if (information) {
        return (
            <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
                <Header
                    information={information}
                    setInformation={setInformation}
                />
                <Information />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-neutral-950">
            <Header
                information={information}
                setInformation={setInformation}
            />

            <div className="gap-6 p-6 flex flex-col">
                <div className="flex flex-col gap-6 md:flex-row w-full">
                    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                        <h2 className="text-lg font-semibold">
                            Dashboard Navigation
                        </h2>

                        <div className="flex flex-col gap-4 mt-4">
                            <button
                                className="flex items-center gap-2 underline text-blue-500 font-semibold"
                            >
                                Go to Home Dashboard <FaArrowRight />
                            </button>
                            <button
                                className="flex items-center gap-2 underline text-blue-500 font-semibold"
                            >
                                Go to Comments Dashboard <FaArrowRight />
                            </button>
                            <button
                                className="flex items-center gap-2 underline text-blue-500 font-semibold"
                            >
                                Go to Theaters Dashboard <FaArrowRight />
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                        <h2 className="text-lg font-semibold">
                            Action Button
                        </h2>

                        <button
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 text-2xl"
                        >
                        </button>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                    </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                           
                        </div>
                </div>
        </main>
    );
}