"use client";

import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";



export default function Loading() {
    const [information, setInformation] = useState(false);

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

            <div className=" gap-6 p-6 flex flex-col animate-pulse">
                    <div className="flex flex-col gap-6 md:flex-row w-full">
                        <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                            <h2 className="text-lg font-semibold">
                                Dashboard Navigation
                            </h2>
                            <div className="flex flex-col gap-4 mt-4">
                            <button  className="flex transition items-center gap-2 underline text-blue-500 font-semibold">
                                Go to Home Dashboard <FaArrowRight />
                            </button>
                            <button  className="flex transition items-center gap-2 underline text-blue-500 font-semibold">
                                Go to Comments Dashboard <FaArrowRight />
                            </button>
                            <button  className="flex transition items-center gap-2 underline text-blue-500 font-semibold">
                                Go to Theaters Dashboard <FaArrowRight />
                            </button>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                           <h2 className="text-lg font-semibold">
                                Search Here by Keyword
                            </h2>
                            <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Enter keyword"
                                className="w-full rounded-md border border-gray-300 p-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
                            />
                            <button
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
                            >
                              Search
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                            <h2 className="text-lg font-semibold">
                                    Search Results
                            </h2>
                    </div>
               </div>
        </main>
    );
}