import { createPostService, deletePostService, getAllPostsService, updatePostService } from "./post.service.js"
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

export const deletePost = async (req, res) => {
    try {
        const post = await deletePostService(req)

        res.status(200).json({
            success: true,
            message: "Post deleted succesfully",
            data: post
        })
    } catch (error) {
        if (error.message === "You do not have permissions to delete this post" ||
            error.message === "Post not found") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Can not delete post", 500)
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await updatePostService(req)

        res.status(200).json({
            success: true,
            message: "Post updated succesfully",
            data: post
        })
    } catch (error) {
        if (error.message === "You do not have permissions to update this post" ||
            error.message === "Post not found") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Can not update post", 500)
    }
}