import { ForbiddenError, NotFoundError, ValidationError } from "../../utils/handleError.js"
import { createPostRepository, deletePostRepository, getAllPostsRepository, getOwnPostsRepository, getPostRepository, getTimelineRepository, updatePostRepository } from "./post.repository.js"

export const createPostService = async (req) => {
    const message = req.body.message
    const userId = req.tokenData.userId

    if (!message) {
        throw new ValidationError("No message to create post")
    }

    const posts = await createPostRepository(message, userId)

    return posts
}

export const getAllPostsService = async (req) => {

    const posts = await getAllPostsRepository()

    return posts
}

export const deletePostService = async (req) => {
        const postId = req.params.id
        const { userId, roleName } = req.tokenData

        const post = await getPostRepository(postId)
        
        if (!post) {
            throw new NotFoundError("Post not found")
        }

        if (post.authorId.toString() === userId.toString() || roleName === "super_admin") {
            const deletedPost = await deletePostRepository(postId)
    
            return deletedPost    
        } else {
            throw new ForbiddenError("You do not have permissions to delete this post")
        } 
        
}

export const updatePostService = async (req) => {
    const { postId, message } = req.body
    const { userId, roleName } = req.tokenData

    const post = await getPostRepository(postId)
    
    if (!post) {
        throw new NotFoundError("Post not found")
    }

    if (post.authorId.toString() === userId.toString() || roleName === "super_admin") {
        const updatedPost = await updatePostRepository(postId, message)

        return updatedPost    
    } else {
        throw new ForbiddenError("You do not have permissions to update this post")
    } 
    
}

export const getOwnPostsService = async (req) => {
    const userId = req.tokenData.userId

    const posts = await getOwnPostsRepository(userId)

    return posts
}

export const likePostService = async (req) => {
    const postId = req.params.id
    const userId = req.tokenData.userId

    const post = await getPostRepository(postId)
    
    if (!post) {
        throw new NotFoundError("Post not found")
    }
    
    if (post.authorId.toString() === userId.toString()) {
        throw new ValidationError("You can not like your own post")
    }

    if (post.likes.includes(userId)) {
        post.likes.pull(userId)
    } else {
        post.likes.push(userId)
    }

    await post.save()

    return post
}

export const getTimelineService = async (req) => {
    const userId = req.tokenData.userId

    const posts = await getTimelineRepository(userId)

    return posts
}

export const commentPostService = async (req) => {
    const postId = req.params.id
    const userId = req.tokenData.userId
    const comment = req.body.comment

    const post = await getPostRepository(postId)
    
    if (!post) {
        throw new NotFoundError("Post not found")
    }
    console.log(post)
    console.log(comment)
    post.comments.push({ 
        commentatorId: userId, 
        commentary: comment
    })

    await post.save()

    return post
}