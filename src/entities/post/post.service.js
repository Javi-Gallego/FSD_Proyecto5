import { createPostRepository } from "./post.repository.js"


export const createPostService = async (req) => {
    const { title, content } = req.body
    const userId = req.tokenData.userId

    if (!title && !content) {
        throw new Error("No data to create post")
    }

    const post = await createPostRepository(title, content, userId)

    return post
}