import { createPostService, getAllPostsService } from "./post.service.js"
import { handleError } from "../../utils/handleError.js"

export const createPost = async (req, res) => {
    try {
        const post = await createPostService(req)

        res.status(201).json({
            success: true,
            message: "Post created succesfully",
            data: post
        })
    } catch (error) {
        if (error.message === "No message to create post") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant create post", 500)
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await getAllPostsService(req)

        res.status(201).json({
            success: true,
            message: "Posts retrieved succesfully",
            data: posts
        })
    } catch (error) {
        handleError(res, "Cant retrieve posts", 500)
    } 
}