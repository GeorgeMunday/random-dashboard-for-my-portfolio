"use client";

import { useAuth } from "@/lib/context/AuthContext";


import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import { CommentDocument, getComments} from "@/lib/helpers/displayComments/script";

export function Dashboard() {
    const [information, setInformation] = useState(false);
    const [comments, setComments] = useState<CommentDocument[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);

    const { user, loading } = useAuth();

    const router = useRouter();

    const handleLoadMore = async () => {
        try {
            setLoadingComments(true);

            const data = await getComments({
                amount: 10,
                skip: comments.length,
            });

            setComments ((prev) => [...prev, ...data.documents]);
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
                                onClick={() => router.push("/dashboard")}
                            >
                                Go to Home Dashboard <FaArrowRight />
                            </button>
                            <button
                                className="flex items-center gap-2 underline text-blue-500 font-semibold"
                                onClick={() =>
                                    router.push("/dashboard/comments")
                                }
                            >
                                Go to Comments Dashboard <FaArrowRight />
                            </button>
                            <button
                                className="flex items-center gap-2 underline text-blue-500 font-semibold"
                                onClick={() =>
                                    router.push("/dashboard/theaters")
                                }
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
                            onClick={handleLoadMore}
                            disabled={loadingComments}
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 text-2xl"
                        >
                            {loadingComments
                                ? "Loading..."
                                : "Click Here to Grab More Comments"}
                        </button>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                    {comments.length === 0 ? (
                    <div>
                        <h2 className="text-lg font-semibold">
                            Amount of Comments displayed
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {comments.length}
                        </p>
                    </div>
                    ) : (
                        <>
                                                    <div>
                        <h2 className="text-lg font-semibold">
                            Amount of Comments displayed
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {comments.length}
                        </p>
                    </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                            {comments.map((comment) => (
                                <div
                                    key={comment._id}
                                    className="rounded-lg bg-blue-100 p-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="text-blue-500 font-semibold">
                                                Auther: {comment.name}
                                            </h2>
                                            <p className="text-xl font-bold text-blue-600">
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {comment.createdAt
                                                ? new Date(comment.createdAt).toLocaleString()
                                                : "Unknown"}
                                        </span>
                                    </div>

                                    <div>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Dashboard;