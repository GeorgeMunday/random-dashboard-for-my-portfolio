"use client";
    
import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {FaArrowRight} from "react-icons/fa"

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import UserInformationTile from "@/components/molecules/UserInformationTile/UserInformationTile";

export default function Loading() {
    const [information, setInformation] = useState(false);
    const { signout } = useAuth();
    const router = useRouter();

    const user = {
        id: "123",
        username: "NA",
        email: "john.doe@example.com"
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
            <div className=" gap-6 p-6 flex flex-col animate-pulse">
                    <UserInformationTile user={user} signout={signout} />
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
                            <button className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard/theaters/display");
                                }
                            }>
                                Go to Display Theaters <FaArrowRight />
                            </button>
                             <button className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard/theaters/search");
                                }
                            }>
                                Go to Search <FaArrowRight />
                            </button>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                            <h2 className="text-lg font-semibold">
                                Random Page Navigation
                            </h2>
                            
                             <div className="flex items-center justify-center h-full pb-6  ">
                                <button
                                    type="button"
                                    className="flex h-20 w-20 items-center text-white justify-center rounded-full bg-blue-500 text-sm font-medium text-neutral-700transition hover:bg-blue-400"
                                >
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">Theater Information</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-lg bg-blue-100 p-4 text-center">
                                <p className="text-2xl font-bold text-blue-500">
                                   Loading...
                                </p>
                                <p className="text-sm text-black">Number of Theaters</p>
                            </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500"> 
                                Loading...
                            </p>
                            <p className="text-sm text-black">Most Common State</p>
                        </div>
                    </div>
                </div>
               </div>
        </main>
    );
}