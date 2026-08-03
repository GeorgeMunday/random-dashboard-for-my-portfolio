"use client";
    
import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {FaArrowRight} from "react-icons/fa"

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import getAllTheaters from "@/lib/helpers/allTheaters/script";
import getMostCommonState from "@/lib/helpers/getMostCommonState/script";
import UserInformationTile from "@/components/molecules/UserInformationTile/UserInformationTile";

interface MostCommonState {
  mostCommonState: string;
  count: number;
  timestamp: number;
}

export  function Dashboard() {
    const [information, setInformation] = useState(false);
    const [theaterCount, setTheaterCount] = useState<number | null>(null);
    const [randomNum, setRandomNum] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);
    const [data, setData] = useState<MostCommonState | null>(null);

    const { user, loading, signout } = useAuth();

    const router = useRouter();

        const randomLoader = () => {
        setFirstLoad(false);
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 3);
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
            router.push("/dashboard/theaters/display");
        } else if (randomNum === 2) {
            router.push("/dashboard/theaters/search");
        }
    };

    useEffect(() => {
        if (!user) return;

        async function loadTheaterCount() {
            try {
                const count = await getAllTheaters();
                setTheaterCount(count);
            }
            catch (error) {
                console.error("Failed to load theater count:", error);
                setTheaterCount(null);
            }
        }

        loadTheaterCount();
    }, [user]);

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
                    <UserInformationTile user={user} signout={signout} />
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
                                    onClick={randomLoader}
                                >
                                    {firstLoad ? "Random" : randomNum === 0 ? "Comments" : randomNum === 1 ? "Display" : randomNum === 2 ? "Search" : "Random"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow">
                        <h2 className="text-lg font-semibold">Theater Information</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-lg bg-blue-100 p-4 text-center">
                                <p className="text-2xl font-bold text-blue-500">
                                   {theaterCount !== null ? theaterCount : "Loading..."}
                                </p>
                                <p className="text-sm text-black">Number of Theaters</p>
                            </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center">
                            <p className="text-2xl font-bold text-blue-500"> 
                                {data ? data.mostCommonState : "Loading..."}
                            </p>
                            <p className="text-sm text-black">Most Common State</p>
                        </div>
                    </div>
                </div>
               </div>
        </main>
    );
}

export default Dashboard;