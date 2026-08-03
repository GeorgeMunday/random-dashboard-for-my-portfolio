"use client";
    
import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {FaArrowRight} from "react-icons/fa"

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import getNewestComment, { NewestComment } from "@/lib/helpers/getNewestComment/script";
import UserInformationTile from "@/components/molecules/UserInformationTile/UserInformationTile";

interface CommentDocument extends NewestComment {
    name?: string;
    email?: string;
    text?: string;
    createdAt?: string | number | Date | null;
}

export  function Dashboard() {
    const [information, setInformation] = useState(false);
    const [randomNum, setRandomNum] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true);
        const [newestComment, setNewestComment] = useState<CommentDocument | null>(null);

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
        async function fetchNewestComment() {
            try {
                const result = await getNewestComment();
                setNewestComment(result as CommentDocument | null);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNewestComment();
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
                        <div className="mt-4W">
                            <div className="bg-blue-100 rounded-xl p-4">
                                {newestComment ? (
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-semibold text-blue-500">Most Recent Comments</h2>
                                        <p>
                                            <span className="font-semibold">Name:</span>{" "}
                                            {newestComment.name ?? "Unknown"}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Email:</span>{" "}
                                            {newestComment.email ?? "Unknown"}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Comment:</span>{" "}
                                            {newestComment.text ?? "No comment text available"}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Date:</span>{" "}
                                            {(() => {
                                                const rawDate = newestComment.createdAt;
                                                if (!rawDate) return "Unknown";

                                                const parsedDate = new Date(rawDate);
                                                return Number.isNaN(parsedDate.getTime())
                                                    ? "Unknown"
                                                    : parsedDate.toLocaleString();
                                            })()}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                                        No recent comment found.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
               </div>
        </main>
    );
}

export default Dashboard;