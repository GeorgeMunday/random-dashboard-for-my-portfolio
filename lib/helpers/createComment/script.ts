import axios from "axios";

export default async function createComment(name: string, text: string) {
    try {
        const response = await axios.post("/api/comments/create", {
            name,
            text,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating comment:", error);
        return null;
    }
}