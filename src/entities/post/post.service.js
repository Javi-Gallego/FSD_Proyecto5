import { createPostRepository } from "./post.repository.js"


export const createPostService = async (req) => {
    const { message } = req.body
    const userId = req.tokenData.userId

    if (!message) {
        throw new Error("No message to create post")
    }

    const post = await createPostRepository(message, userId)

    return post
}