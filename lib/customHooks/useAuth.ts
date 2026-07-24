import { useState, useEffect } from "react";

import axios from "axios";

export function useAuth() {

    async function signin(
        username: string,
        password: string
    ) {
        try {
            const response = await axios.post("/api/auth/signin", {
                username,
                password,
            });
        } catch (error) {
           console.error("Sign-in error:", error);
        }
    }

    async function signup(
        username: string,
        password: string
    ) {
        try {
            const response = await axios.post("/api/auth/signup", {
                username,
                password,
            });
        } catch (error) {
            console.error("Sign-up error:", error);
        }
    }

    async function signout() {
        try {
            const response = await axios.post("/api/auth/signout");
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    }

    return {
        signin,
        signup,
        signout,
    };
}

// import axios from "axios";

// export async function UseLogin(
//   username: string,
//   password: string,
// ): Promise<boolean> {
//   try {
//     await axios.post(`/api/auth/login/${username}/${password}`);
//     return true;
//   } catch {
//     return false;
//   }
// }