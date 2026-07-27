"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { useRouter } from "next/navigation";

interface User {
    id: string;
    username: string;
}

interface AuthContextType {

    user: User | null;

    loading: boolean;

    signin(
        username: string,
        password: string
    ): Promise<void>;

    signup(
        username: string,
        password: string
    ): Promise<void>;

    signout(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    const router = useRouter();


    useEffect(() => {

        async function loadUser() {

            try {

                const res = await fetch("/api/auth/me");

                if (!res.ok) {
                    return;
                }

                if (res.status === 200) {
                    router.prefetch("/dashboard");
                }

                const data = await res.json();

                setUser(data.user);

            } finally {

                setLoading(false);

            }

        }

        loadUser();

    }, []);

    async function signin(
        username: string,
        password: string
    ) {

        const res = await fetch("/api/auth/signin", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                username,
                password,
            }),

        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        setUser(data.user);
    }

    async function signup(
        username: string,
        password: string
    ) {

        const res = await fetch("/api/auth/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                username,
                password,
            }),

        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }
    }

    async function signout() {

        await fetch("/api/auth/signout", {
            method: "POST",
        });

        setUser(null);

        router.push("/");
    }

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                signin,
                signup,
                signout,
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be inside AuthProvider"
        );
    }

    return context;
}