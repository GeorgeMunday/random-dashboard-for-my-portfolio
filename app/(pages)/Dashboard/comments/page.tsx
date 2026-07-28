"use client";
    
import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {FaArrowRight} from "react-icons/fa"

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import getAllTheaters from "@/lib/helpers/allTheaters/script";
import getMostCommonState from "@/lib/helpers/getMostCommonState/script";

interface MostCommonState {
  mostCommonState: string;
  count: number;
  timestamp: number;
}

export  function Dashboard() {
    const [information, setInformation] = useState(false);
    const [randomNum, setRandomNum] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);
    const [data, setData] = useState<MostCommonState | null>(null);

    const { user, loading, signout } = useAuth();

    const router = useRouter();

        const randomLoader = () => {
        setFirstLoad(false);
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 5);
                setRandomNum(randomNumber);
            }, 100 * i);
        }
        setTimeout(() => {
            handelRandomButtonClick();
        }, 1000);
    };

    const handelRandomButtonClick = () => {
        if (randomNum === 0) {
            router.push("/dashboard/comments");
        } 
         else if (randomNum === 1) {
            router.push("/dashboard/comments/display");
        } else if (randomNum === 2) {
            router.push("/dashboard/comments/search");
        } else if (randomNum === 3) {
            router.push("/dashboard/comments/create");
        } else if (randomNum === 4) {
            router.push("/dashboard/comments/delete");
        }
    };

     useEffect(() => {
    async function fetchData() {
      try {
        const result = await getMostCommonState();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }

    fetchData();
  }, []);

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
                                    This is your Comments dashboard — access features here to manage your comments and explore the application.
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
                            <button className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard/comments/display");
                                }
                            }>
                                Go to Display Comments <FaArrowRight />
                            </button>
                             <button className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard/comments/search");
                                }
                            }>
                                Go to Search Comment <FaArrowRight />
                            </button>
                            <button className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard/comments/create");
                                }
                            }>
                                Go to Create Comment <FaArrowRight />
                            </button>
                            <button className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                            onClick={
                                () => {
                                    router.push("/dashboard/comments/delete");
                                }
                            }>
                                Go to Delete Comment <FaArrowRight />
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
                                    onClick={randomLoader}
                                >
                                    {firstLoad ? "Click Here" : randomNum === 0 ? "Comments" : randomNum === 1 ? "Display" : randomNum === 2 ? "Search" : randomNum === 3 ? "Create" : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">Comment Information</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-lg bg-blue-100 p-4 text-center">
                                <p className="text-2xl font-bold text-blue-500">
                                   1234
                                </p>
                                <p className="text-sm text-black">Number of Comments</p>
                            </div>
                    </div>
                </div>
               </div>
        </main>
    );
}

export default Dashboard;