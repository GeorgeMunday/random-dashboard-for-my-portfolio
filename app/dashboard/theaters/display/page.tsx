"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { getTheaters } from "@/lib/helpers/displayTheaters/script";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import { TheaterDocument } from "@/lib/helpers/displayTheaters/script";
import Loading from "./loading";

export function Dashboard() {
    const [information, setInformation] = useState(false);
    const [theaters, setTheaters] = useState<TheaterDocument[]>([]);
    const [loadingTheaters, setLoadingTheaters] = useState(false);

    const { user, loading } = useAuth();

    const router = useRouter();

    const handleLoadMore = async () => {
        try {
            setLoadingTheaters(true);

            const data = await getTheaters({
                amount: 10,
                skip: theaters.length,
            });

            setTheaters((prev) => [...prev, ...data.documents]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingTheaters(false);
        }
    };

    if (loading) {
        return (
            <Loading/>
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
                            disabled={loadingTheaters}
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300 text-2xl"
                        >
                            {loadingTheaters
                                ? "Loading..."
                                : "Click Here to Grab More Theaters"}
                        </button>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                    {theaters.length === 0 ? (
                    <div>
                        <h2 className="text-lg font-semibold">
                            Amount of Theaters displayed
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {theaters.length}
                        </p>
                    </div>
                    ) : (
                        <>
                                                    <div>
                        <h2 className="text-lg font-semibold">
                            Amount of Theaters displayed
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {theaters.length}
                        </p>
                    </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                            {theaters.map((theater) => (
                                <div
                                    key={theater._id}
                                    className="rounded-lg bg-blue-100 p-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p>
                                                Theater ID
                                            </p>
                                            <p className="text-xl font-bold text-blue-600">
                                                {theater.theaterId}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {theater.location.address.state}
                                        </span>
                                    </div>

                                    <div>
                                        <p>{theater.location.address.street1}</p>
                                        <p className="text-xs">
                                            {theater.location.address.city}, {theater.location.address.state} {theater.location.address.zipcode}
                                        </p>
                                        <p className="text-xs">
                                            Coordinates: {theater.location.geo.coordinates[1]}, {theater.location.geo.coordinates[0]}
                                        </p>
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