"use client";
    
import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import { CommentDocument } from "@/lib/helpers/displayComments/script";
import { searchComments } from "@/lib/helpers/searchComments/script";



export  function Dashboard() {
    const [information, setInformation] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [comments, setComments] = useState<CommentDocument[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [searched, setSearched] = useState(false);

    const { user, loading } = useAuth();

    const router = useRouter();

    const handleSearch = async () => {
        try {
            if (!searchTerm.trim()) {
                setComments([]);
                setSearched(false);
                return;
            }
            setLoadingComments(true);
            const data = await searchComments(searchTerm);
            setComments(data.documents);
            setSearched(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingComments(false);
        }
    };

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
                            <button  className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
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
                                Search Here by Keyword
                            </h2>
                            <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Enter keyword"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full rounded-md border border-gray-300 p-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
                            />
                            <button
                                onClick={handleSearch}
                                disabled={loadingComments}
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
                            >
                              {loadingComments ? "Searching..." : "Search"}
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                            <h2 className="text-lg font-semibold">
                                    Search Results
                            </h2>
                            <div className={`${comments.length == 0? "" : "mt-4"} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
                                {searched && comments.length === 0 ? (
                                    <p >
                                        No comments matched your search.
                                    </p>
                                ) : (
                                    comments.map((comment) => (
                                        <div
                                    key={comment._id}
                                    className="rounded-lg bg-blue-100 p-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p>
                                                Comment Name
                                            </p>
                                            <p className="text-xl font-bold text-blue-600">
                                                {comment.text}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {comment.name}
                                        </span>
                                    </div>
                                </div>
                                    ))
                                )}
                            </div>
                    </div>
               </div>
        </main>
    );
}

export default Dashboard;