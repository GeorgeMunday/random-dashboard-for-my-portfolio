"use client";
    
import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaArrowRight } from "react-icons/fa";

import Header from "@/components/molecules/Header/Header";
import Information from "@/components/organisms/Information/Information";
import { TheaterDocument } from "@/lib/helpers/displayTheaters/script";
import { searchTheaters } from "@/lib/helpers/searchTheaters/script";



export  function Dashboard() {
    const [information, setInformation] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [theaters, setTheaters] = useState<TheaterDocument[]>([]);
    const [loadingTheaters, setLoadingTheaters] = useState(false);
    const [searched, setSearched] = useState(false);

    const { user, loading } = useAuth();

    const router = useRouter();

    const handleSearch = async () => {
        try {
            if (!searchTerm.trim()) {
                setTheaters([]);
                setSearched(false);
                return;
            }
            setLoadingTheaters(true);
            const data = await searchTheaters(searchTerm);
            setTheaters(data.documents);
            setSearched(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingTheaters(false);
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
                                    router.push("/dashboard/theaters");
                                }
                            }>
                                Go to Theaters Dashboard <FaArrowRight />
                            </button>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full md:w-1/2">
                           <h2 className="text-lg font-semibold">
                                Search Here by City
                            </h2>
                            <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Enter city name"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full rounded-md border border-gray-300 p-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
                            />
                            <button
                                onClick={handleSearch}
                                disabled={loadingTheaters}
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
                            >
                              {loadingTheaters ? "Searching..." : "Search"}
                            </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
                            <h2 className="text-lg font-semibold">
                                    Search Results
                            </h2>
                            <div className={`${theaters.length == 0? "" : "mt-4"} grid gap-4 md:grid-cols-2 xl:grid-cols-3`}>
                                {searched && theaters.length === 0 ? (
                                    <p >
                                        No theaters matched your search.
                                    </p>
                                ) : (
                                    theaters.map((theater) => (
                                        <div
                                            key={theater._id}
                                            className="rounded-lg bg-blue-100 p-4"
                                        >
                                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                {theater.theaterId}
                                            </p>
                                            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                                                {theater.location.address.street1}
                                            </p>
                                            <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                                {theater.location.address.city}, {theater.location.address.state} {theater.location.address.zipcode}
                                            </p>
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