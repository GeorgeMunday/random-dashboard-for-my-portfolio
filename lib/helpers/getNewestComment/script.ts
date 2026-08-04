import axios from "axios";

import type {
  CachedNewestComment,
  NewestComment,
} from "@/types/newest-comment";

export type { NewestComment } from "@/types/newest-comment";

const CACHE_KEY =
  process.env.NEXT_PUBLIC_NEWESTCOMMENT_CACHE_KEY ?? "newestCommentCache";

const CACHE_TIME =  60 * 1000;

export default async function getNewestComment(): Promise<NewestComment | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    try {
      const data = JSON.parse(cached) as CachedNewestComment;

      if (
        data &&
        typeof data.timestamp === "number" &&
        data.comment &&
        Date.now() - data.timestamp < CACHE_TIME
      ) {
        return data.comment;
      }
    } catch (error) {
      console.warn("Corrupted newest comment cache, refetching:", error);
      localStorage.removeItem(CACHE_KEY);
    }
  }

  try {
    const response = await axios.get("/api/comments/newest");
    const comment = response.data?.documents?.[0] ?? null;

    if (!comment) {
      return null;
    }

    const result = {
      comment,
      timestamp: Date.now(),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(result));

    return comment;
  } catch (error) {
    console.error("Error fetching newest comment:", error);
    return null;
  }
}