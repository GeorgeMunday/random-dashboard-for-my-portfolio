"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRight } from 'react-icons/fa'

import Header from '@/components/molecules/Header/Header'
import Information from '@/components/organisms/Information/Information'

import createComment from '@/lib/helpers/createComment/script'

const Page = () => {
    const [information, setInformation] = useState(false)
    const [commentName, setCommentName] = useState('')
    const [commentText, setCommentText] = useState('')
    const router = useRouter()

    const onSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createComment(commentName, commentText)
        setCommentName('')
        setCommentText('')
    }

    const createSampleComment = async () => {
        await createComment('Hardcoded Test User', 'This is a hardcoded test comment')
    }

    if (information) {
        return (
            <>
                <Header information={information} setInformation={setInformation} />
                <Information />
            </>
        )
    }

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-neutral-950">
            <Header information={information} setInformation={setInformation} />

            <div className=" mx-auto p-6 space-y-6">
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
                        <h2 className="text-lg font-semibold">Create Sample Comment</h2>
                        <button
                            type="button"
                            onClick={createSampleComment}
                            className="mt-4 inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md font-semibold"
                        >
                            Click Here to Create a Sample Comment
                        </button>
                    </div>
                </div>

                <form className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900" onSubmit={onSubmitComment}>
                    <h2 className="text-lg font-semibold">Create Comment Form</h2>

                    <div className="mt-4 grid gap-4">
                        <label className="block">
                            <p >
                                Comment Name
                            </p>
                            <input
                                type="text"
                                placeholder="Enter comment name"
                                value={commentName}
                                onChange={(e) => setCommentName(e.target.value)}
                                className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:border-neutral-700"
                            />
                        </label>

                        <label className="block">
                            <p>
                                Comment Text
                            </p>
                            <textarea
                                id="feedback"
                                name="feedback"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Enter your text here..."
                                className="mt-2 w-full h-40 resize-y rounded-md border border-gray-300 bg-white px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-neutral-800 dark:border-neutral-700"
                            />
                        </label>

                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                className="mt-4 inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md font-semibold"
                            >
                                Create Comment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Page
