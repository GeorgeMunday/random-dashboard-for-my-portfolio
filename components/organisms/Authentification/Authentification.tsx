"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";

import { useRouter } from "next/navigation";

const Authentification = () => {
    const { signin, signup, user } = useAuth();

    const [authentificationType, setAuthentificationType] = useState<"signin" | "signup">("signin");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await signin(email, password);

            router.push("/dashboard");

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleGuestSignIn() {
        setError("");
        setLoading(true);
        try {
            await signin("test@user1", "12345678");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
            router.push("/dashboard");
        }
    }

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await signup(email, password);

            router.push("/dashboard");

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    if (user) {
        return null;
    }

    if (authentificationType === "signin") {
        return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-gray-100 p-10 font-sans dark:bg-black">

                <h1 className="text-3xl font-bold">
                    Sign In
                </h1>

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                <form
                    onSubmit={handleSignIn}
                    className="flex flex-col gap-2"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="rounded border border-gray-300 bg-white px-4 py-2"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="rounded border border-gray-300 bg-white px-4 py-2"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <button
                    onClick={() => {
                        setError("");
                        setAuthentificationType("signup");
                    }}
                    className="text-blue-500 underline"
                >
                    Don&apos;t have an account? Sign Up
                </button>

                <button
                    onClick={() => {
                        handleGuestSignIn();
                    }}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    Sign in as Guest
                </button>

            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-gray-100 p-10 font-sans dark:bg-black">

            <h1 className="text-3xl font-bold">
                Sign Up
            </h1>

            {error && (
                <p className="text-red-500">
                    {error}
                </p>
            )}

            <form
                onSubmit={handleSignUp}
                className="flex flex-col gap-2"
            >

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="rounded border border-gray-300 bg-white px-4 py-2 dark:bg-black"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="rounded border border-gray-300 bg-white px-4 py-2 dark:bg-black"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    className="rounded border border-gray-300 bg-white px-4 py-2 dark:bg-black"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

            </form>

            <button
                onClick={() => {
                    setError("");
                    setAuthentificationType("signin");
                }}
                className="text-blue-500 underline"
            >
                Already have an account? Sign In
            </button>

            <button
                onClick={() => {
                    setError("");
                    setLoading(true);
                }}
                className="rounded bg-blue-500 px-4 py-2 text-white"
            >
                Sign in as Guest
            </button>

        </div>
    );
};

export default Authentification;