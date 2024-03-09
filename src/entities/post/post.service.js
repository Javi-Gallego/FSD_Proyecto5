import { createPostRepository, getAllPostsRepository } from "./post.repository.js"

export const createPostService = async (req) => {
    const message = req.body.message
    const userId = req.tokenData.userId

    if (!message) {
        throw new Error("No message to create post")
    }

    const posts = await createPostRepository(message, userId)

    return posts
}

export const getAllPostsService = async (req) => {

    const posts = await getAllPostsRepository()

    return posts
}