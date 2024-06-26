import { commentPostService, createCommentService, createPostService, deletePostService, getAllPostsService, getMostLikedPostsService, getOwnPostsService, getTimelineService, likePostService, searchPostsService, updatePostService } from "./post.service.js"
import { ForbiddenError, NotFoundError, ValidationError, handleError } from "../../utils/handleError.js"

export const createPost = async (req, res) => {
    try {

        const post = await createPostService(req)

        res.status(201).json({
            success: true,
            message: "Post created succesfully",
            data: post
        })
    } catch (error) {
        if (error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Cant create post", 500, error.message)
    }
}

export const getAllPosts = async (req, res) => {
    try {
        console.log("controller")
        const posts = await getAllPostsService(req)
        console.log("controllerdevuelta")
        console.log(posts)
        res.status(201).json({
            success: true,
            message: "Posts retrieved succesfully",
            data: posts
        })
    } catch (error) {
        handleError(res, "Cant retrieve posts", 500, error.message)
    } 
}

export const searchPosts = async (req, res) => {
    try {
        const posts = await searchPostsService(req)

        res.status(201).json({
            success: true,
            message: "Posts retrieved succesfully",
            data: posts
        })
    } catch (error) {
        handleError(res, "Cant retrieve posts", 500, error.message)
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
        if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Can not delete post", 500, error.message)
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
        if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Can not update post", 500, error.message)
    }
}

export const getOwnPosts = async (req, res) => {
    try {
        const posts = await getOwnPostsService(req)

        res.status(201).json({
            success: true,
            message: "Posts retrieved succesfully",
            data: posts
        })
    } catch (error) {
        handleError(res, "Cant retrieve posts", 500, error.message)
    } 
}

export const likePost = async (req, res) => {
    try {
        const post = await likePostService(req)

        res.status(200).json({
            success: true,
            message: "Post liked succesfully",
            data: post
        })
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Can not like post", 500, error.message)
    }
}

export const getTimeline = async (req, res) => {
    try {
        const post = await getTimelineService(req)

        res.status(200).json({
            success: true,
            message: "Timeline retrieved succesfully",
            data: post
        })
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Can not retrieve timeline", 500, error.message)
    }
}

export const commentPost = async (req, res) => {
    try {
        const post = await commentPostService(req)

        res.status(200).json({
            success: true,
            message: "Comment added succesfully",
            data: post
        })
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Can not comment post", 500, error.message)
    }
}

export const createComment = async (req, res) => {
    try {
        console.log("controller")
        const post = await createCommentService(req)

        res.status(200).json({
            success: true,
            message: "Comment added succesfully",
            data: post
        })
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Can not comment post", 500, error.message)
    }
}

export const getMostLikedPosts = async (req, res) => {
    try {
        console.log("controller")
        const posts = await getMostLikedPostsService(req)

        res.status(201).json({
            success: true,
            message: "Posts retrieved succesfully",
            data: posts
        })
    } catch (error) {
        handleError(res, "Cant retrieve posts", 500, error.message)
    } 
};