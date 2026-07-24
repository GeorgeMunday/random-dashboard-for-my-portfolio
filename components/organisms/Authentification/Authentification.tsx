 "use client";
import { useState } from 'react'

const Authentification = () => {
  const [AuthentificationType, setAuthentificationType] = useState("signin")
  

  if (AuthentificationType === "signin") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 p-10 font-sans rounded-2xl dark:bg-black">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <form className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            className="rounded border border-gray-300 px-4 py-2 bg-white dark:bg-black"
          />
            <input
            type="password"
            placeholder="Password"
            className="rounded border border-gray-300 px-4 py-2 bg-white dark:bg-black"
          />

            <button type="submit" className="bg-blue-500 text-white px- py-2 rounded">
              Sign In
            </button>
          </form>
          <button
          onClick={() => setAuthentificationType("signup")}
          className="text-blue-500 underline"
          >
              Don&apos;t have an account? Sign Up
          </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign In As Guest
        </button>
      </div>
      )
    } else if (AuthentificationType === "signup") {
        return (
            <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 p-10 font-sans rounded-2xl dark:bg-black">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <form className="flex flex-col gap-2">
                    <input
                        type="email"
                        placeholder="Email"
                        className="rounded border border-gray-300 px-4 py-2 bg-white dark:bg-black"    
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="rounded border border-gray-300 px-4 py-2 bg-white dark:bg-black"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="rounded border border-gray-300 px-4 py-2 bg-white dark:bg-black"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Sign Up
                    </button>
                </form>
                <button
            onClick={() => setAuthentificationType("signin")}
            className="text-blue-500 underline"
            >
              Already have an account? Sign In
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Sign In As Guest
            </button>
            </div>
        )
    }
}

export default Authentification