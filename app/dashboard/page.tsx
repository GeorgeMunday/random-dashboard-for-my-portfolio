"use client";

import { useAuth } from "@/lib/context/AuthContext";
import useOnlineStatus from "@/lib/customHooks/useOnlineStatus";
import testDatabaseConnection from "@/lib/helpers/testDb/script";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FaArrowRight } from "react-icons/fa";

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import getAllComments from "@/lib/helpers/allComments/script";
import getAllTheaters from "@/lib/helpers/allTheaters/script";
import getAllUsers from "@/lib/helpers/allUsers/script";

export function Dashboard() {
    const [information, setInformation] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [firstLoadDiget, setFirstLoadDiget] = useState(true);
    const [randomNum, setRandomNum] = useState(0);
    const [randomDiget, setRandomDiget] = useState(0);
    const [apiTime, setApiTime] = useState<number | null>(null);
    const [dbStatus, setDbStatus] = useState<string | null>(null);
    const [userCount, setUserCount] = useState<number | null>(null);
    const [theaterCount, setTheaterCount] = useState<number | null>(null);
    const [commentCount, setCommentCount] = useState<number | null>(null);

    const { user, loading, signout } = useAuth();
    const isOnline = useOnlineStatus();

    const router = useRouter();

    const randomDigetLoader = () => {
        setFirstLoadDiget(false);
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 100);
                setRandomDiget(randomNumber);
            }, 100 * i);
        }
    };

    const randomLoader = () => {
        setFirstLoad(false);
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 2);
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
        } else if (randomNum === 1) {
            router.push("/dashboard/theaters");
        }
    };


    useEffect(() => {
        if (!user) return;

        async function checkDatabase() {
            const result = await testDatabaseConnection();
            setDbStatus(result.connected ? "Online" : "Offline");
            setApiTime(result.apiTime);
        }

        checkDatabase();
    }, [user]);

    useEffect(() => {
        if (!user) return;

        async function loadUserCount() {
            try {
                const count = await getAllUsers();
                setUserCount(count);
            } catch (error) {
                console.error("Failed to load user count:", error);
                setUserCount(null);
            }
        }

        loadUserCount();
    }, [user]);
    
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
        if (!user) return;

        async function loadCommentCount() {
            try {
                const count = await getAllComments();
                setCommentCount(count);
            }
            catch (error) {
                console.error("Failed to load comment count:", error);
                setCommentCount(null);
            }
        }

        loadCommentCount();
    }, [user]);

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
            <Header information={information} setInformation={setInformation} />

            <div className=" gap-6 p-6 flex flex-col">
                {/* welcome message that has user information */}
                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">
                                Welcome,{" "}
                                <span className="font-bold text-blue-500">
                                    {user.username ?? "there"}
                                </span>
                            </h1>
                            <p className="text-xl text-neutral-500 dark:text-neutral-400">
                                This is your Home dashboard — access features here and
                                manage your account.
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
                        <h2 className="text-lg font-semibold">Dashboard Navigation</h2>
                        <div className="flex flex-col gap-4 mt-4">
                            <button
                                className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                                onClick={() => {
                                    router.push("/dashboard/comments");
                                }}
                            >
                                Go to Comments Dashboard <FaArrowRight />
                            </button>
                            <button
                                className="flex transition items-center gap-2 underline text-blue-500 font-semibold"
                                onClick={() => {
                                    router.push("/dashboard/theaters");
                                }}
                            >
                                Go to Theaters Dashboard <FaArrowRight />
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
                                onClick={randomLoader}
                            >
                                {firstLoad
                                    ? "Click Here"
                                    : randomNum === 0
                                    ? "Comments"
                                    : "Theaters"}
                            </button>
                        </div>
                    </div>
                </div>
                {/* statistics */}
                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                    <h2 className="text-lg font-semibold">Statistics</h2>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">
                                {userCount ?? "0"}
                            </p>
                            <p className="text-sm text-black">Total Users</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">
                                {commentCount ?? "0"}
                            </p>
                            <p className="text-sm text-black">Sample Data Comments</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">
                                {theaterCount ?? "0"}
                            </p>
                            <p className="text-sm text-black">Sample Data Theaters</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                    <h2 className="text-lg font-semibold">Random Number Generator</h2>

                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            className="flex h-20 w-20 items-center text-white justify-center rounded-full bg-blue-500 text-sm font-medium text-neutral-700transition hover:bg-blue-400"
                            onClick={randomDigetLoader}
                        >
                            {firstLoadDiget ? "Click Here" : randomDiget}
                        </button>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
                    <h2 className="text-lg font-semibold">Server Information</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">
                                {isOnline ? "Connected" : "Disconnected"}
                            </p>
                            <p className="text-sm text-black">WiFi Status</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">
                                {typeof apiTime === "number"
                                    ? `${apiTime.toFixed(2)} ms`
                                    : "N/A"}
                            </p>
                            <p className="text-sm text-black">Server Latency</p>
                        </div>

                        <div className="rounded-lg bg-blue-100 p-4 text-center dark:bg-neutral-800">
                            <p className="text-2xl font-bold text-blue-500">
                                {dbStatus || "N/A"}
                            </p>
                            <p className="text-sm text-black">Database Status</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;